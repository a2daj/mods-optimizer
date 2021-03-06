// @flow

import React from 'react';
import Arrow from '../Arrow/Arrow';
import ModImage from '../ModImage/ModImage';
import ModStats from '../ModStats/ModStats';
import CharacterAvatar from '../CharacterAvatar/CharacterAvatar';
import './ModDetail.css';
import { connect } from "react-redux";
import SellModButton from "../SellModButton/SellModButton";

class ModDetail extends React.PureComponent {
  render() {
    const mod = this.props.mod;
    const character = mod.characterID ? this.props.characters[mod.characterID] : null;
    const assignedCharacter = this.props.assignedCharacter;
    const assignedTarget = this.props.assignedTarget;
    const showAssigned = !!this.props.showAssigned;

    return (
      <div className='mod-detail'>
        <ModImage mod={mod} />
        {character && <CharacterAvatar character={character} />}
        {character &&
          <h4 className={'character-name'}>{
            this.props.gameSettings[character.baseID] ? this.props.gameSettings[character.baseID].name : character.baseID
          }</h4>
        }
        <div className="stats">
          <ModStats mod={mod} assignedCharacter={assignedCharacter} assignedTarget={assignedTarget} />
          {showAssigned && assignedCharacter && <div className={'assigned'}>
            <Arrow />
            <CharacterAvatar character={assignedCharacter} />
          </div>}
        </div>
        <SellModButton mod={mod} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  characters: state.profile.characters,
  gameSettings: state.gameSettings
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ModDetail);
