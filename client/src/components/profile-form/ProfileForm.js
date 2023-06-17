import { useMutation } from "@apollo/client";
import "./ProfileForm.css";
import React, { useState } from "react";
//TODO import { ADD_CHARACTER} from '../../utils/mutations'

function ProfileForm() {
  const [characterName, setCharacterName] = useState("");
  const [lineage, setLineage] = useState("");
  const [ customization, setCustomization] = useState("");
  const [formState, setFormState] = useState({
    characterName: "",
    lineage: "",
    customization: "",
  });

 //TODO const[addCharacter, {error, data}] = useMutation(ADD-CHARACTER)

 const handleChange = (event) => {
  const { name, value } = event.target;

  setFormState({
    ...formState,
    [name]: value,
  });

  if (name === "characterName") {
    setCharacterName(value);
  }
  
  if (name === "lineage") {
    setLineage(value);
  }

  if (name === "customization") {
    setCustomization(value);
  }
};

const handleFormSubmit = async (event) => {
  event.preventDefault();

  if(characterName.length < 3 || characterName.length >30){
    alert("Character name must be between 3 and 20 characters.");
    return;
  }
}

  
  return (
    <>
      <form className="profile-form" onSubmit={handleFormSubmit}>
        <div className="form-q1">
          <h2>Name your character</h2>
          <label for="character-name">Character Name</label>
          <input type="text" className="character-name" />
        </div>
        <div className="form-q2">
          <h2>Pick your lineage</h2>
          <label for="lineage">Lineage</label>
          <select name="lineage" className="lineage">
            <option name='lineage' type='radio' value="knight" selected>Knight</option>
            <option name='lineage' type='radio' value="mage">Mage</option>
            <option name='lineage' type='radio' value="assassin">Assassin</option>
            <option name='lineage' type='radio' value="berserker">Berserker</option>
            <option name='lineage' type='radio' value="cleric">Cleric</option>
          </select>
        </div>
        <div className="form-q3">
            <h2>customize your Fit</h2>
            <label for='customization'>color</label>
            <div className="color-div"/>
            <input name='customization' className="customization" type='range' min='-360' max='360' />
            {/* add formatting to change character color(hue?) */}
        </div>
        <input className='hidden submit-btn' type='submit' value='submit'><button>Save</button></input>
      </form>
    </>
  );
}
export default ProfileForm;
