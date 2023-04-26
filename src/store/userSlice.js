import { configureStore, createSlice } from '@reduxjs/toolkit'

let user = createSlice({
    name: 'user',
    //만약, initialState 가  array/object라면?
    initialState: { name:'kim', age:20 },
    reducers: { //reducers즈 란다. 
    changeName(state){ // 파라미터 state는 기존state를 뜻함
     //initialState 가 array/object인 경우, return문 안쓰고 직접수정
     // 직접수정__짱편리
      state.name ='park'
    },
    
    Increase(state, action){ //두번째 파라미터 = 증감값
     state.age += action.payload //payload는 화물 //파라미터 뚫어놓으면 함수 여러개 필요X
    }
    }
 })
 
 // 만든 변경함수 export 해야함
 // 아래에는 state 변경함수들 남음
 export let {changeName, Increase} = user.actions
 //user.actions의 객체 자료 중 changeName이라는 속성을 추출하여 변수로 저장한것

 export default user