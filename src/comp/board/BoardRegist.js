import { useState } from "react";
import { boardRegist } from "../api/board";
import { useNavigate } from "react-router-dom";
export default function BoardRegist() {
    const [제목, 제목변경] = useState('');
    const [내용, 내용변경] = useState('');
    const navigate = useNavigate();

    function Regist() {
        const obj = {
            title: 제목,
            content: 내용,
            memberId: "hong"
        };


        boardRegist(obj).then(() => {

            navigate('/boardList')
        }).catch(() => {
            alert('실패');
        });
    }

    return (
        <div>
            <h1>게시글 작성</h1>
            제목: <input type="text" onChange={e => 제목변경(e.target.value)} /><br />
            내용: <input type="text" onChange={e => 내용변경(e.target.value)} /><br />
            <input type="button" value="작성" onClick={Regist} />
        </div>
    );
}
