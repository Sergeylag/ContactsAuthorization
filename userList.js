
// Создаём список контактов
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
    // Создаём компонет Contact
    var Contact = React.createClass({
      render: function() {
        return <li className="contact">
                  <div className="contact-position"> {this.props.position} </div>
                  <div className="contact-info">
                      <div className="contact-name"> {this.props.name} {this.props.lastName}</div>
                      <div className="contact-number"> {this.props.phoneNumber} </div>
                  </div>
               </li>
      }
    });
    // Создаём лист контактов
    var ContactsList = React.createClass({
        getInitialState: function(){
          return {
            displayedContacts: CONTACTS
          };
        },

        handSe: function(event){
          var searchQuery = event.target.value.toLowerCase();
          var displayedContacts = CONTACTS.filter(function(el){
            var searchName = el.name.toLowerCase();
            var searchLastName = el.lastName.toLowerCase();
            return (searchName.indexOf(searchQuery) && searchLastName.indexOf(searchQuery)) !== -1;
          });
          this.setState({
            displayedContacts: displayedContacts
          });
        },

        render: function(){
          return(
            <div className="contacts">
              <input type="text" className="search-field" onChange={this.handSe}/>
              <ul className="contacts-list">
                {
                  this.state.displayedContacts.map(function(el, index){
                    return <Contact
                      index={index}
                      position={el.position}
                      name={el.name}
                      lastName={el.lastName}
                      phoneNumber={el.phoneNumber}
                    />;
                  })
                }
              </ul>
            </div>
            );
        }
    });
    ReactDOM.render(
      <ContactsList/>,
      document.getElementById("content")
      );
