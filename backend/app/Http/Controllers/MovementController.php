<?php

namespace App\Http\Controllers;

use App\Movement;
use Illuminate\Http\Request;

// 表单验证
use Validator;
use Illuminate\Validation\Rule;

// 身份验证
use Illuminate\Support\Facades\Auth;
use App\Model\Department;
use App\Model\Position;


class MovementController extends Controller
{


    public function __construct() {

        $this->middleware('auth.basic.once')->only(['store', 'update', 'destroy']);

         $this->middleware(function ($request, $next) {
            $this->department = Auth::user() ? Auth::user()->department : null;
            $this->position = Auth::user() ? Auth::user()->position : null;
            return $next($request);
        });
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Movement::All();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // 新增内容 => 主席团&宣传部
        if(!($this->department == Department::ZHUXITUAN 
             || $this->department == Department::XUANCHUANBU || $this->department == Department::XIANGMUKAIFABU)) {
            return response()->json(['status' => 403, 'msg' => 'invalid identity'], 403);
        }

        $validator = Validator::make($request->all(), [
            'title_movement' => 'required',
            'introduction_movement' => 'required',
            'html_movement' => 'required'
        ]);

        if ($validator->fails()) {
            return $validator->errors();
        }

        $movement = new Movement;
        $movement->title_movement = $request->title_movement;
        $movement->introduction_movement = $request->introduction_movement;
        $movement->html_movement = $request->html_movement;
        $movement->image_movement = $request->image_movement ? $request->image_movement : null;
        $movement->published_movement = $request->published_movement ? $request->published_movement : null;
        $movement->user_id = Auth::id();
        $movement->view_movement = 0;

        $movement->save();

        error_log(env('APP_URL'));
        return response()->json(['status' => 200, 'msg' => 'the store of movement successful', 'id' => $movement->id, 
                                'url' => env('APP_URL') . '/movements/' . $movement->id]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Movement  $movement
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Movement::find($id);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Movement  $movement
     * @return \Illuminate\Http\Response
     */
    public function edit(Movement $movement)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Movement  $movement
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        if(!ctype_digit($id)) {
            return response()->json(['status' => 400, 'msg' => 'Bad Request. Invalid input. id must be a number'], 400);
        }

        // 修改草稿 => 主席团&宣传部
        if(!($this->department == Department::ZHUXITUAN 
             || $this->department == Department::XUANCHUANBU || $this->department == Department::XIANGMUKAIFABU)) {
            return response()->json(['status' => 403, 'msg' => 'invalid identity!']);
        }

        $validator = Validator::make($request->all(), [
            'title_movement' => 'required',
            'introduction_movement' => 'required',
            'html_movement' => 'required',
            'published_movement' => 'date'
        ]);

        if ($validator->fails()) {
            return $validator->errors();
        }

        $movementDB = Movement::find($id);

        if($movementDB === null) {
            return response()->json(['status' => 404, 'msg' => 'Movement not exists']);
        }

        $movementDB->title_movement = $request->title_movement;
        $movementDB->introduction_movement = $request->introduction_movement;
        $movementDB->html_movement = $request->html_movement;
        $movementDB->image_movement = $request->image_movement?$request->image_movement:null;
        $movementDB->published_movement = $request->published_movement?$request->published_movement:null;

        $movementDB->save();

        return response()->json(['status' => 200, 'msg' => 'the movement id : '.$movementDB->id." updates successfully! "]);


    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Movement  $movement
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        if(!ctype_digit($id)) {
            return response()->json(['status' => 400, 'msg' => 'Bad Request. Invalid input. id must be a number!']);
        }

        // 删除内容 => 主席团&宣传部部长&宣传部副部长
        // 删除草稿 => 主席团&宣传部
        if(!($this->department == Department::ZHUXITUAN 
             || $this->department == Department::XUANCHUANBU || $this->department == Department::XIANGMUKAIFABU)) {
            return response()->json(['status' => 403, 'msg' => 'invalide department']);
        }

        $movementDel = Movement::find($id);

        if($movementDel === null) {
            return response()->json(['status' => 404, 'msg' => 'Movement not exists']);
        }

        //已发布内容
        if($movementDel->published_movement != null) {
            if(!($this->department == Department::ZHUXITUAN || $this->department == Department::XIANGMUKAIFABU
                || ($this->department == Department::XUANCHUANBU
                && ($this->position == Position::BUZHANG || $this->position == Position::FUBUZHANG) ))) {
                return response()->json(['status' => 403, 'msg' => 'invalid identity']);
            }
        }

        $movementDel->delete();

        return response()->json(['status' => 200, 'msg' => 'the delete of id movement: '.$movementDel->id.' deletes successfully! ']);

    }
}
