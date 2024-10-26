import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getComments=createAsyncThunk("comments/get",async(id)=>{
    const response=await axios.get("http://localhost:3004/comments?book="+id)
    return response.data
})

export const addComments = createAsyncThunk("comments/add", async ({ text, rate, book }) => {
    const response = await axios.post("http://localhost:3004/comments", {
        text,
        rate,
        book
    });
    return response.data;
});