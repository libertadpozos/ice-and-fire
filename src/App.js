import React from "react";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: {
        houses: [],
        bloodTypes: [],
        species: [],
        selectedHouses: [],
        selectedBloodTypes: [],
        selectedSpecies: []
      },
      data: {
        data: []
      }
    };
    this.getData = this.getData.bind(this);
    this.getData();
  }
  getData() {
    fetch(
      "https://www.potterapi.com/v1/characters/?key=$2a$10$6NvzlzyaKNkyblkEtkWR4.SzsrJNy61BRFMF95jehEicML/aUGLw2"
    )
      .then(response => response.json())
      .then(data => {
        const info = data;
        const allHouses = info.map(character => character.house);
        const uniqueHouses = allHouses.filter(function(item, index) {
          return allHouses.indexOf(item) >= index;
        });
        const allBloodTypes = info.map(character => character.bloodStatus);
        const uniqueBloodTypes = allBloodTypes.filter(function(item, index) {
          return allBloodTypes.indexOf(item) >= index;
        });
        const allSpecies = info.map(character => character.species);
        const uniqueSpecies = allSpecies.filter(function(item, index) {
          return allSpecies.indexOf(item) >= index;
        });
        console.log(uniqueSpecies);
        console.log(uniqueHouses);
        console.log(uniqueBloodTypes);
        this.setState({
          filters: {
            bloodTypes: uniqueBloodTypes,
            houses: uniqueHouses,
            species: uniqueSpecies
          },
          data: {
            data: info
          }
        });
      });
  }

  handlerFilterHouse(event){
    const value=event.currentTarget.value
    const selectedHouses = this.state.filters.selectedHouses
    this.setState((prevState, index)=>{
      if (selectedHouses.includes(value)){
        const filterHouses = selectedHouses.indexOf(value);
        selectedHouses.splice(filterHouses, 1);
      }
      else {
        selectedHouses.push(value)
      }
      return {
        filters:{
          ...prevState.filters,
          selectedHouses:selectedHouses 
        }
      }
    }
    )
  }
  

  render() {
   console.log(this.state.filters.selectedHouses)
    const data = this.state.data.data;
    const houses = this.state.filters.houses;
    const bloodTypes= this.state.filters.bloodTypes;
    const species= this.state.filters.species;
    console.log(this.state.data.data);

    if (!data.length) {
      return <p className="loading">Loading...</p>;
    } else
      return (
        <div>
          <h1>It's LeviOsa not LeviosA</h1>
          <h2>Filters</h2>
          <h3>Houses</h3>
          {houses.map((house, index) => {
            return (
              <label key={index} htmlFor={house}>
                <input id={house} type="checkbox" value={house} name={house} onChange={this.handlerFilterHouse}/>
                {house}
              </label>
            );
          })}
          <h3>BloodTypes</h3>
          {bloodTypes.map((bloodType, index) => {
            return (
              <label key={index} htmlFor={bloodType}>
                <input id={bloodType} type="checkbox" value={bloodType} name={bloodType} />
                {bloodType}
              </label>
            );
          })}
          <h3>Species</h3>
          {species.map((species, index) => {
            return (
              <label key={index} htmlFor={species}>
                <input id={species} type="checkbox" value={species} name={species} />
                {species}
              </label>
            );
          })}
          <ul>
            {data.map(character => {
              return (
                <li key={character._id} id={character._id}>
                  <p className="character-name">{character.name}</p>
                  <p className="character-house">{character.house}</p>
                  <p className="character-species">{character.species}</p>
                  <p className="character-blood-Satus">
                    {character.bloodStatus}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      );
  }
}

export default App;
