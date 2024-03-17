import { useState } from "react";

function SearchTrainee() {
    const [nameInput, setNameInput] = useState("");
    const [birthdayInput, setBirthdayInput] = useState("");
    const [agencyIdInput, setAgencyIdInput] = useState(0);

    const handleSubmit = () => {

    }

    return (
        <>
            <h1>훈련병을 검색하세요.</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">이름 </label>
                <input type="text" name="name" value={nameInput} onChange={(e) => setNameInput(e.target.value)} />
                <br />

                <label htmlFor="birthday">생년월일 </label>
                <input type="text" name="birthday" value={birthdayInput} onChange={(e) => setBirthdayInput(e.target.value)} />
                <br />

                <label htmlFor="agency">소속 </label>
                <input type="number" name="agency" min={0} max={4} value={agencyIdInput} onChange={(e) => setAgencyIdInput(Number(e.target.value))} />
                <br />

                <button type="submit">검색</button>
            </form>
        </>
    );
}

export default SearchTrainee;
