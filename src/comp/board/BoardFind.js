import { useState, useEffect } from 'react';
import { boardFind, boardRemove, boardGood } from '../api/board'
import { useNavigate } from "react-router-dom";
export default function BoardFind() {

    const [find, setFind] = useState('');
    const navigate = useNavigate();
    const boardIdx = localStorage.getItem('boardIdx');
    useEffect(() => {
        start();
    }, [])


    function start() {
        const param = new Object();
        param.boardId = boardIdx;
        boardFind(param)
            .then(res => {
            
                if (res.data.code == 200) {
                    setFind(res.data.data);
              
                }
            })
    }
    function remove() {

        const param = new Object();
        param.boardId = boardIdx;
        boardRemove(param)
            .then(res => {
                if(res.data.code == 200){
                    navigate('/boardList')
                }

            })

    
    }
    function modify() {
        const param = {
            'boardId': boardIdx,
            'title': find.title,
            'content': find.content,
            'memberId': find.memberId
        }
        localStorage.setItem('modify', JSON.stringify(param))
        navigate('/boardModify')
    }
    function good(){
        const obj = new Object();
        obj.boardId = boardIdx;
        boardGood(obj)
        .then(res => {
           
            if (res.data.code == 200) {
               
                setFind(prevFind => ({
                    ...prevFind,
                    boardGood: prevFind.boardGood + 1
                }));
            }
        })
    }
    return (
        <div>
            <h1>게시글 상세</h1>
            <div>
                <h2>{find.title}</h2>
                <p><strong>작성자:</strong> {find.memberId}</p>
                <p><strong>작성일:</strong>  {find.createdAt}</p>
                <p>{find.content}</p>

                <div>
                    <a onClick={good}>👍 좋아요 {find.boardGood}</a>
                    <input type='button' value='수정' onClick={modify} />
                    <input type='button' value='삭제' onClick={remove} />
                </div>
            </div>
        </div>
    );
}
