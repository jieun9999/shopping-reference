import { Table } from 'react-bootstrap' 
import { useDispatch, useSelector } from 'react-redux'
import  {changeName, Increase}  from './store/userSlice'
import {changeCount,removeItem} from './store.js'

function Cart(){
  
  
  let allState = useSelector((state)=>{return state}) //이 코드 자리에는 Redux store에 있는 모든 state들 남음
  let stock = useSelector((state)=>{return state.stock})
  let carts = useSelector((state)=>{return state.carts})
  let dispatch = useDispatch() //store.js로 요청을 보내주는 함수임
 
  //참고로, {}와 return 을 한번에 생략가능
  console.log(allState.user)
  console.log(stock)
  console.log(carts)
  
  
    return(
  <div>

 <h6>{allState.user.name} {allState.user.age}의 장바구니</h6>
 <button onClick={()=>{dispatch(Increase(100))}}>눌러봐</button>
 {/*버튼을 누를때마다 user.age가 +1이 되도록 만들기 */}
 {/*여기서 파리미터 100은 메세지에 실어보내는 화물임 */}
<Table>
  <thead >
    <tr>
      <th>#</th>
      <th>상품명</th>
      <th>수량</th>
      <th>변경하기</th>
      <th>삭제하기</th>
    </tr>
  </thead>
  {/*데이터 갯수에 맞게 표 생성해달라고 반복문쓰는 것도 좋을듯요*/}
  {/*map으로 html 생성할때 일단 {}부터 쓴다 */}
  {
  carts.map((item,i)=>{
    return (
    <tbody key={i}>
    <tr>
      <td>{carts[i].id}</td>
      <td>{carts[i].name}</td>
      <td>{carts[i].count}</td>
      <td>
        {/* 특정 id의 +버튼을 누르면 동일 id의 상품 수량이 +1이 되도록  */}
        {/* id를 사용하는 이유: 만약 정렬버튼을 눌렀을때 0번째 +버튼을 눌렀는데 기존에 2번째였던 상품갯수가 +1이 될수있는 사태방지 */}
        <button onClick={()=>{
          dispatch((changeCount(carts[i].id))) //+버튼을 눌렀을때 count가 1씩 증가한다
          //changeCount()안에 증감뿐만 아니라 몇번째인지도 넣을 수 있다
          //만약 ()안에 i를 전달한다면? ~~번째로 전달하는 것
          //만약 ()안에 id를 전달한다면? 고유의 id로 전달하는 것
        }}>➕</button>
      </td>
      <td>
        {/*버튼을 누르면 상품이 삭제되게 하려면 */}
        <button onClick={()=>{dispatch(removeItem(i))}}>❌</button>
      </td>
    </tr>
  </tbody>
    )
   })
}
</Table> 

        </div>
    )
}



export default Cart