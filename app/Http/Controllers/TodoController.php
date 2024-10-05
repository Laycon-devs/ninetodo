<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    public function index()
    {
        $todos = Todo::orderby('id', 'DESC')->get();
        return response()->json($todos);
    }

    public function store(Request $request)
    {
        $newTodo = $request->input('newtodo');

        $todos = new Todo();
        $todos->todo = $newTodo;
        $todos->save();

        return response()->json([
            'msg' => 'Todo Added successfully...',
            'data' => $todos,
        ], 201);
    }

    public function delete($id)
    {
        $todos = Todo::find($id);

        if ($todos) {
            $todos->delete();
            return response()->json(['msg' => 'Todo deleted successfully'], 200);
        } else {
            return response()->json(['msg' => 'Failed to delete todo'], 404);
        }
    }

    public function checktodos(Request $request)
    {
        $request->validate([
            'todoId' => 'required|integer|exists:todos,id',
            'checked' => 'required|integer'
        ]);

        $todoId = $request->input('todoId');
        $checkbool = $request->input('checked');

        $todos = Todo::find($todoId);
        $todos->check = $checkbool;
        $todos->save();

        return response()->json(['msg' => 'Todo completed successfully', 'data' => $todos], 200);
    }
}
