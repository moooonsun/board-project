import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { boardList } from '../api/board';
export default function BoardList() {
    const [boards, setBoards] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [search, setSearch] = useState('1');
    const navigate = useNavigate();

    useEffect(() => {
        startBoardList();
    }, []);
    function startBoardList(seachItem) {

        boardList(seachItem)
            .then(res => {

                if (res.data.code == 200) {
                    setBoards(res.data.data);

                }
            })
    }
    useEffect(() => {
        seachBtn();
    }, [search, keyword]);


    function seachBtn() {
        let param = new Object();


        if (search === '1') {
            param.keyword = keyword;
        } else {
            param.created = keyword;
        }

        startBoardList(param);
    }

    return (
        <div>
            <h1>게시판 리스트</h1>
            <select onChange={
                e => setSearch(e.target.value)
            }>
                <option value='1'>제목</option>
                <option value='2'>작성자</option>
            </select>
            <input type="text" placeholder='검색' value={keyword} onChange={
                e => setKeyword(e.target.value)
            } />
     
            <input type="button" value='검색' onClick={seachBtn} />
            <input type="button" value='글쓰기'onClick={
                ()=>
                navigate('/boardRegist')
            }/>
            <table border="2px solid black" style={{ width: "100%" }}>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>작성일</th>
                        <th>추천</th>
                    </tr>
                </thead>
                <tbody>
                    {boards.map((board) => (
                        <tr key={board.boardIdx} onClick={
                            () => {
                                localStorage.setItem('boardIdx', board.boardIdx)
                                navigate(`/boardFind`)
                            }
                        }>
                            <td>{board.boardIdx}</td>
                            <td>{board.title}</td>
                            <td>{board.memberId}</td>
                            <td>{new Date(board.createdAt).toLocaleString('ko-KR', {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit',
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit',
                            })}</td>
                            <td>{board.boardGood}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
