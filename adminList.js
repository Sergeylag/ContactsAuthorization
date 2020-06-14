
// Создаёс список контактов
    var CONTACTS = [
      {
        name: 'Alisa',
        lastName: 'Smit',
        phoneNumber: '+72253324545',
        position: 'administrator'
      },
      {
        name: 'Misha',
        lastName: 'Mangal',
        phoneNumber: '+72334333541',
        position: 'manager'
      },
      {
        name: 'Kiril',
        lastName: 'Trofimov',
        phoneNumber: '+74534353533',
        position: 'user'
      },
      {
        name: 'Mashandra',
        lastName: 'Nurahbekovna',
        phoneNumber: '+78884455622',
        position: 'user'
      },
    ]
// обработка новых данных и запись их
    var changeCon = [];
    var NewContat = React.createClass({
            getInitialState: function(){
              return {
                nameStat: '',
                lastNameStat: '',
                phoneNumberStat: '',
                positionStat: '',
              };
            },

             addNewCon: function(){
              var newCon = {
                  name: this.state.nameStat,
                  lastName: this.state.lastNameStat,
                  phoneNumber: this.state.phoneNumberStat,
                  position: this.state.positionStat,
              };
              CONTACTS = [...CONTACTS, newCon];
              changeCon = [...changeCon, newCon];
              this.setState({positionStat: ''});
              this.setState({nameStat: ''});
              this.setState({lastNameStat: ''});
              this.setState({phoneNumberStat: ''});
             },
            nameChange: function(event){
                this.setState({nameStat: event.target.value});
            },
            lastNameChange: function(event){
                this.setState({lastNameStat: event.target.value});
            },
            phoneChange: function(event){
                this.setState({phoneNumberStat: event.target.value});
            },
            positionChange: function(event){
                this.setState({positionStat: event.target.value});
            },
            render: function(){
               var style = {
                 color: 'red',
               };
               return (
              <div className="newContact">
                <input type="text" placeholder="position" onChange={this.positionChange} value={this.state.positionStat}/>
                <input type="text" placeholder="name" onChange={this.nameChange} value={this.state.nameStat}/>
                <input type="text" placeholder="lastName" onChange={this.lastNameChange} value={this.state.lastNameStat}/>
                <input type="text" placeholder="phoneNumber" onChange={this.phoneChange} value={this.state.phoneNumberStat}/>
                <p><input type="button" value="Добавить" onClick={this.addNewCon}/></p>
                {
                  changeCon.map(function(el, index){
                    return <div style={style} key = {index}>{el.position} : {el.name} {el.lastName} {el.phoneNumber}</div>;
                  })
                }
              </div>);
            }
    });
    //----Изменение существующей записи-----------------------------
    var ChangeContacts = React.createClass({
            getInitialState: function(){
              return {
                nameStat: this.props.name,
                lastNameStat: this.props.lastName,
                phoneNumberStat: this.props.phoneNumber,
                positionStat: this.props.position,
              };
            },
            nameChange: function(event){
                this.setState({nameStat: event.target.value});
                CONTACTS[this.props.index].name = event.target.value;
            },
            lastNameChange: function(event){
                this.setState({lastNameStat: event.target.value});
                CONTACTS[this.props.index].lastName = event.target.value;
            },
            phoneChange: function(event){
                this.setState({phoneNumberStat: event.target.value});
                CONTACTS[this.props.index].phoneNumber = event.target.value;
            },
            positionChange: function(event){
                this.setState({positionStat: event.target.value});
                CONTACTS[this.props.index].position = event.target.value;
            },
      render: function(){
               return (
              <div>
                <input type="text" placeholder="position" onChange={this.positionChange} value={this.state.positionStat}/>
                <input type="text" placeholder="name" onChange={this.nameChange} value={this.state.nameStat}/>
                <input type="text" placeholder="lastName" onChange={this.lastNameChange} value={this.state.lastNameStat}/>
                <input type="text" placeholder="phoneNumber" onChange={this.phoneChange} value={this.state.phoneNumberStat}/>
              </div>);
            }
    });
//--------------------------------
class MyContactsList extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        Contacts: CONTACTS,
        addContacts: false ,
        changeContacts: false ,
        valbut: "добавить контакт",
        changeIndex: null,
      };
    }

    save() {
      if(!this.state.addContacts){
              this.setState({
                valbut: "сохранить/закрыть"
              }) 
           }else {
              changeCon = [];
              this.setState({
                 valbut: "добавить контакт"
              });
              this.setState({
                 Contacts: CONTACTS
              });
            }
            return this.setState({
                addContacts: !this.state.addContacts
            })
    }

    deleteTodo(index){
       let Contacts = this.state.Contacts.slice();  
       Contacts.splice(index.target.value, 1);
       this.setState({Contacts});
       CONTACTS = Contacts;
    }
    changeContacts(index){
      return this.setState({
                changeContacts: !this.state.changeContacts,
                changeIndex: index.target.value,
            })
    }
    searchContacts(event){
      var searchQuery = event.target.value.toLowerCase();
      var Contacts = CONTACTS.filter(function(el){
        var searchName = el.name.toLowerCase();
        var searchLastName = el.lastName.toLowerCase();
        return (searchName.indexOf(searchQuery) && searchLastName.indexOf(searchQuery)) !== -1;
        });
      this.setState({
        Contacts: Contacts
      });
    }
    render(){
        return(
            <div className="list">
              <h1> My Contants List</h1>
                <input type="text" className="search" onChange={this.searchContacts.bind(this)}/>
                <input className="butAddContact" type="button" value={this.state.valbut} onClick={this.save.bind(this)}/>
                {this.state.addContacts ? <NewContat/> : null}
                {this.state.Contacts.map((el, index) => {
                    return <div className="contact" key={index}>
                    <div className="info">
                    <div className="position">{el.position} : </div>
                    <div className="name">{el.name} {el.lastName}</div>
                     <div className="phone">{el.phoneNumber}</div></div>
                      {!this.state.changeContacts ?
                        <button className="butChange" value={index} onClick={this.changeContacts.bind(this)} >Изменить
                        </button> : 
                        ((index == this.state.changeIndex) ?
                          <div className="change"> 
                              <ChangeContacts 
                              index={index}
                              position={el.position}
                              name={el.name}
                              lastName={el.lastName}
                              phoneNumber={el.phoneNumber}
                              />
                              <button value={index} onClick={this.changeContacts.bind(this)} >Сохранить
                              </button>
                          </div> : null )}
                      {!this.state.changeContacts ?
                        <button className="butDel" value={index} onClick={this.deleteTodo.bind(this)} >Удалить
                        </button> : null}
                    </div>
                })}
            </div>
        )
    }
};

ReactDOM.render(<MyContactsList/>, document.getElementById('content'))


