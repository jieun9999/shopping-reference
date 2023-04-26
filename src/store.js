//Redux 라이브러리 왜 씀?
// 컴포넌트간 state 공유가 편해짐
// <App/>,<Detail/>,<Cart/> 등 컴포넌트들이 redux store.js 에서 state들을 가져다 쓸 수 있음

// import, export ~~ 등 state들을 보관하는 파일임
import user from './store/userSlice.js'
import { configureStore, createSlice } from '@reduxjs/toolkit'
//여기에 state를 만들거임

//useState와 비슷한 역할임. state 생성
// state 하나를 slice 라고 부름
//initialState 뒤에는 초기값 state를 넣고
//reducer 뒤에는 state 변경함수를 넣는다


//state를 하나 더 만들어봅시다. 재고 state
let stock = createSlice({
    name:'stock',
    initialState:[10, 11, 12]
})

//하단의 데이터를 store에 보관하고
//Cart.js(장바구니 페이지)에서 데이터 바인딩
//initialState의 자리에는 객체가 올 수 있다. 슬라이스의 모든 상태 속성을 포함할 수 있다

//cart 라는 이름으로 state를 생성해주자

// Redux의 state 변경하는 법
//1.state 수정해주는 함수 만들고
//2.원할 때 그 함수를 수정해달라고, store.js에 요청
let carts = createSlice({
  name: 'carts',
  initialState:
  [
    {id : 0, name : 'Red Knit', count : 2},
    {id : 2, name : 'Grey Yordan', count : 1},
    {id : 3, name : 'Rockey', count : 1}
  ],
  /* 이 +버튼을 누르면 동일 id의 상품 수량이 +1이 되도록  */
  /*누른버튼의 순서가 0일경우, 0번째 버튼이 동작한다 */
  // 변경함수 파라미터에 넣은 자료들은 action.payload하면 자료가 나옴
  // dispatch((changeCount(i))) 
  reducers:{
    changeCount(state,action){
      //action.payload와 state의 id가 같은 인덱스만 찾는다
      let idIndex = state.findIndex((item)=>{return item.id === action.payload})
      state[idIndex].count += 1
     },
     addItem(state,action){
      //이미 상품이 있다면 수량만 +1하고(새로들어온 state id가 기존id와 동일한 것이 있는지 파인드인덱스를 돌려서),
      //그렇지 않으면 그대로 추가
      //idIndex2가 null이나 0일 경우, if(idIndex2 != undefined)는 true가 되지만, 
      //이는 실제로는 원하는 결과가 아닐 수 있습니다. 따라서 if(typeof idIndex2 !== 'undefined')와 같이 타입 비교를 하는 것이 좋습니다.
      let idIndex2 = state.findIndex((item)=>{
      return item.id === action.payload.id})
      if(idIndex2 === -1){
      state.push(action.payload)
      }else{
      state[idIndex2].count += 1 
      }
      //findIndex() 메소드는 배열에서 주어진 함수에 대해 처음으로 참 값을 반환하는 요소의 인덱스를 반환합니다. (ex.0,1,2,3,..)
      //만약 참 값을 반환하는 요소가 없으면 -1을 반환합니다.
    },
     removeItem(state,action){
     state.splice(action.payload, 1)
     }
  }
})
export let {changeCount, addItem,removeItem} = carts.actions

//createSlice에 state 선언했다고 끝이아니고,
// reducer:{} 안에 등록해야함. state 등록
export default configureStore({
  reducer: {
    user: user.reducer,
    stock: stock.reducer,
    carts: carts.reducer
    
  }
}) 
//이제 아무컴포넌트에나 가서 user라는 state를 쓸수 잇음

//단 여러 컴포넌트를 오가며 state를 쓸게 아니라면 굳이 Redux store에 저장하지 않아도 됨
// 특히, 한 컴포넌트 안에서 쓸것이라면 useState만으로 충분