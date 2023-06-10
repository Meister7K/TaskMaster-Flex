import "./ProfileForm.css";

function ProfileForm() {
  return (
    <>
      <form className="profile-form">
        <div className="form-q1">
          <h2>Name your character</h2>
          <label for="character-name">Character Name</label>
          <input type="text" className="character-name" />
        </div>
        <div className="form-q2">
          <h2>Pick your lineage</h2>
          <label for="lineage">Lineage</label>
          <select name="lineage" className="lineage">
            <option value="knight">knight</option>
            <option value="mage">Mage</option>
            <option value="assassin">Assassin</option>
            <option value="berserker">Berserker</option>
            <option value="cleric">Cleric</option>
          </select>
        </div>
        <div className="form-q3">
            <h2>customize your Fit</h2>
            {/* add formatting to change character color(hue?) */}
        </div>
        <input className='hidden submit-btn' type='submit' value='submit'>Submit</input>
      </form>
    </>
  );
}
export default ProfileForm;
