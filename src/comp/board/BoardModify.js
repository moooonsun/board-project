import { useEffect, useState } from "react";
import { boardModify } from "../api/board";
import { useNavigate } from "react-router-dom";
export default function BoardModify() {
    
    const modify = JSON.parse(localStorage.getItem('modify'));
    const [제목, 제목변경] = useState(modify.title);
    const [내용, 내용변경] = useState(modify.content);
    const navigate = useNavigate();
    function Regist() {
        const obj = new Object();
        obj.boardId = modify.boardId;
        obj.title = 제목;
        obj.content = 내용;
        obj.memberId = modify.memberId;

        boardModify(obj)
        .then(res => {
            
            if(res.data.code == 200){
                navigate('/boardList')
            }
        })
    }

    return (
        <div>
            <h1>게시글 수정</h1>
            제목: <input type="text" value={제목} onChange={e => 제목변경(e.target.value)} /><br />
            내용: <input type="text" value={내용} onChange={e => 내용변경(e.target.value)} /><br />
            <input type="button" value="수정" onClick={Regist} />
        </div>
    );
}
