import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/actions/userActions';


function RegisterPage() {
  const dispatch = useDispatch();
  const BASE_URL = "http://112.154.249.74:8080/members/signup";

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    passwordCheck: "",
    nickname: "",
    address: "",
    fieldList: [],
  });

  const [errors, setErrors] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [dong, setDong] = useState("");
  const [results, setResults] = useState([]);

  const [selectedValue, setSelectedValue] = useState('');


  const toggleModal = () => setIsOpen(!isOpen);


  const handleSearch = async () => {
    try {
      const response = await fetch(`http://api.vworld.kr/req/data?service=data&request=GetFeature&data=LT_C_ADEMD_INFO&key=D3D9E0D0-062C-35F0-A49D-FC9E863B3AD5&format=json&geometry=false&attrFilter=emd_kor_nm:like:${encodeURIComponent(dong)}`);
      const data = await response.json();
      if (data && data.response && data.response.result && data.response.result.featureCollection) {
        setResults(data.response.result.featureCollection.features);
      } else {
        console.log("Invalid response:", data);
      }
    } catch (error) {
      console.error(error);
    }
  };



  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'fieldList' && formValues.fieldList.length >= 2 && !formValues.fieldList.includes(value)) {
      return;
    }
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: name === 'fieldList' ? [...prevValues.fieldList, value] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(BASE_URL, { ...formValues, address: selectedValue || formValues.address, });
      alert('회원가입이 완료되었습니다.');
      if (response.status === 200) {
        dispatch(login(response.data));
        navigate('/login');
      }
    } catch (error) {
      setErrors(error.response);
      console.log(error.response);
    }
  };

  return (
    <div>
      <FormContainer onSubmit={handleSubmit}>
        <Header>
          <Logo>
            회원가입
          </Logo>

        </Header>
        <InputContainer>
          <Label htmlFor="email">이메일</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            required
          />
          {errors.email && <span>{errors.email}</span>}
        </InputContainer>
        <InputContainer>
          <Label htmlFor="password">비밀번호</Label>
          <Input
            type="password"
            id="password"
            name="password"
            value={formValues.password}
            onChange={handleChange}
            required
          />
          {errors.password && <span>{errors.password}</span>}
        </InputContainer>

        <InputContainer>
          <Label htmlFor="passwordCheck">비밀번호 확인</Label>
          <Input
            type="password"
            id="passwordCheck"
            name="passwordCheck"
            value={formValues.passwordCheck}
            onChange={handleChange}
            required
          />
          {errors.passwordCheck && <span>{errors.passwordCheck}</span>}
        </InputContainer>

        <InputContainer>
          <Label htmlFor="nickname">닉네임</Label>
          <Input
            type="text"
            id="nickname"
            name="nickname"
            value={formValues.nickname}
            onChange={handleChange}
            required
          />
          {errors.nickname && <span>{errors.nickname}</span>}
        </InputContainer>

        <InputContainer >

          <Label htmlFor="city">시/군/구</Label>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Input style={{ width: "355px" }}
              type="text"
              id="address"
              name="address"
              value={selectedValue || formValues.address}
              onChange={handleChange}
              required
            />
            {errors.address && <span>{errors.address}</span>}


            <button className='search-button' onClick={toggleModal}>주소검색</button>
          </div>
          {isOpen && (
            <StyledModal>
              <div className="modal-content">
                <h2>주소 검색(동을 입력하세요)</h2>
                <div className='search-content' style={{ display: "flex", alignItems: "center" }}>
                  <input className="text-content" value={dong} onChange={(e) => setDong(e.target.value)} />
                  <button type='text' onClick={handleSearch}>검색</button>
                </div>
                {results.map((result) => (
                  <div key={result.properties.emd_cd}>
                    <span>{result.properties.full_nm}</span>
                    <button className="choice-content" onClick={() => {
                      setSelectedValue(result.properties.full_nm);
                      toggleModal();
                    }}>선택</button>
                  </div>
                ))}
              </div>
            </StyledModal>
          )}

        </InputContainer>


        <InputContainer>
          <Label htmlFor="field">관심 분야</Label>

          <RadioContainer>
            <input
              type="checkbox"
              id="Android"
              name="fieldList"
              value="Android"
              onChange={handleChange}

              // checked={formValues.fieldList.includes('Android')}
            />
            <RadioLabel htmlFor="Android">Android</RadioLabel>

            <input
              type="checkbox"
              id="OS"
              name="fieldList"
              value="OS"
              onChange={handleChange}

              // checked={formValues.fieldList.includes('OS')}
            />
            <RadioLabel htmlFor="OS">OS</RadioLabel>

            <input
              type="checkbox"
              id="IOS"
              name="fieldList"
              value="IOS"
              onChange={handleChange}

              // checked={formValues.fieldList.includes('IOS')}
            />
            <RadioLabel htmlFor='IOS'>IOS</RadioLabel>

            <input
              type="checkbox"
              id="Algorism"
              name="fieldList"
              value="Algorism"
              onChange={handleChange}

              // checked={formValues.fieldList.includes('Algorism')}
            />
            <RadioLabel htmlFor='Algorism'>Algorism</RadioLabel>

            <input
              type="checkbox"
              id="Server"
              name="fieldList"
              value="Server"
              onChange={handleChange}

              // checked={formValues.fieldList.includes('Server')}
            />
            <RadioLabel htmlFor='Server'>Server</RadioLabel>

            <input
              type="checkbox"
              id="Web"
              name="fieldList"
              value="Web"
              onChange={handleChange}

              // checked={formValues.fieldList.includes('Web')}
            />
            <RadioLabel htmlFor='Web'>Web</RadioLabel>

            <input
              type="checkbox"
              id="machine learning"
              name="fieldList"
              value="machine learning"
              onChange={handleChange}

              // checked={formValues.fieldList.includes('machine learning')}
            />
          
            <RadioLabel htmlFor='machine learning'>machine learning</RadioLabel>

          </RadioContainer>
          {errors.fieldList && <span>{errors.fieldList}</span>}
        </InputContainer>

        <button className='submit-button' type="submit">회원가입</button>

      </FormContainer>

    </div>

  );
}

export default RegisterPage;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
  .submit-button{
    background-color:#CFDCFF;
  }
`;

const Header = styled.div`
display: center;
position: fixed;
top: 0;
width: 100vw;
height: 70px;
padding: auto;
background-color: #CFDCFF;
`;

const Logo = styled.div`
font-weight: bolder;
margin-top: 10px;
display: flex;
color: #515151;
font-size: 30px;
position: absolute;
  left: 20%;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  width: 100%;
  max-width: 450px;

.search-button{
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  margin-left: 20px;
  font-size: 15px;
  cursor: pointer;
  padding: 10px 7px;

}
`;

const Label = styled.label`
display:flex;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color:gray;
  font-weight: bolder;
`;

const Input = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid gray;
  border-radius: 0.3rem;
  width: 100%;
  margin-top: 0.5rem;
  border-color: #CFDCFF;
`;


const StyledModal = styled.div`
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
background-color: rgba(0, 0, 0, 0.5);
display: flex;
justify-content: center;
align-items: center;
}

.search-content {
  padding-bottom: 0px;
}

.modal-content {
display:flex;
align-items: center;
background-color: white;
padding: 20px;
border-radius: 5px;
box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
width:40%;
height:auto;


}

h2 {
margin-top: 0;
}

.text-content {
  flex: 1;
  padding: 8px ;
  font-size: 16px;
  border: 2px solid #ccc;
  border-radius: 5px;
  width: 70%;
  box-sizing: border-box;
  margin-right: 20px;
  
}

button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

.choice-content{
  background-color: #4CAF50;
  color: white;
  padding: 3px 10px;
  margin-left: 5px;
  border: none;
  border-radius: 5px;
  font-size: 10px;
  cursor: pointer;
}
`;

// const Button = styled.button`
// background-color: #4CAF50;
//   color: white;
//   padding: 10px 20px;
//   border: none;
//   margin-bottom: 5px;
//   border-radius: 5px;
//   font-size: 16px;
//   cursor: pointer;
// `;

// const InputRadio = styled.input`
// margin-right: 10px;
//   transform: ${({ checkbox }) => checkbox || 'scale(1.4)'};
//   -webkit-appearance: none;
//   border: 0.5px solid;
//   padding: 5px;
//   border-radius: 2px;
//   border-color: #FB0552;
//   position: relative;
//   margin-left: 10px;
//   &:checked {
//     border-color: transparent;
//     background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
//     background-size: 100% 100%;
//     background-position: 50%;
//     background-repeat: no-repeat;
//     background-color: #FB0552;
//   }
// `;

const RadioContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const RadioLabel = styled.label`
  margin-right: 0.5rem;
  font-size: 20px;
  display:flex;
  flex-direction: row;
  color:gray;
`;
