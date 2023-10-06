import { useState } from "react";
import Card from '../card/card';
import isWinner from '../../helpers/checkWinner';
import './Grid.css';

function Grid({numberofCards}){
    const [board, setBoard] = useState(Array(numberofCards).fill(""));
    const [turn, setturn] = useState(true); //true => o, false => x
    const [winner, setWinner]=useState(null);

    function play(index){
        if(turn==true){
            board[index]="o";
        }else{
            board[index]="x";
        }
        const win=isWinner(board,turn ? "o" : "x");
        if(win){
            setWinner(win);
        }
        setBoard([...board]);
        setturn(!turn);
    }

    function reset(){
        setturn(true);
        setWinner(null);
        setBoard(Array(numberofCards).fill(""))
    }

    return(
        <div className="grid-wrapper">
            {
                winner &&(
                    <>
                        <h1 className="turn-highlight"> Winner is {winner} </h1>
                        <button className="reset" onClick={reset}>Reset Game</button>
                    </>
                )
            }
            <h1 className="turn-highlight">Current turn: {(turn) ? 'o' : 'x'}</h1>
            <div className="grid">
            {board.map((el,idx)=> <Card gameEnd={winner ? true : false} key={idx} onPlay={play} player={el} index={idx} />)}
        </div>
        </div>
    );
}

export default Grid;