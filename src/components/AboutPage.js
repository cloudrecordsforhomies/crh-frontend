import React, { Component } from "react";
import "../styles/Home.css";
import About from "./About"

export default class AboutPage extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSelection = event => {
    this.setState({[event.target.id]: event.target.value});
  }

  render() {
    return (
      <div>
     <table>
      <tbody>
      <tr>
      <td>
       <div><About name="Safa Tinaztepe" linkedin = "https://www.linkedin.com/in/safatinaztepe/" facebook ="https://www.facebook.com/safa.tinaztepe" desc1 = "Frontend Developer" desc2 = "Product Manager" desc3 = "Loves null pointers" image = "https://avatars2.githubusercontent.com/u/8147022?s=460&v=4"/> </div>
      </td>
      <td>
       <div><About name= "Tejas Kashyap" linkedin = "www.linkedin.com/in/tejasvkashyap/" facebook = "www.facebook.com/tejas.v.kashyap" desc1 = "Frontend Developer" desc2 = "Scrum Master" desc3 = "Rugby Player" image = "https://scontent-atl3-1.xx.fbcdn.net/v/t31.0-8/15896373_1230298507026046_4721607100954488594_o.jpg?_nc_cat=101&_nc_ht=scontent-atl3-1.xx&oh=a5977560dda5b0e790f4818b77838d42&oe=5C7C2CD0" /></div>
      </td>
      <td>
        <div><About name="Tom Purdy" linkedin = "https://www.linkedin.com/in/thomas-purdy-608a0a141/" facebook ="https://www.facebook.com/thomas.purdy.77" desc1 = "Backend Developer" desc2 = "Group Leader" desc3 = "Lacrosse Player" image = "https://media.licdn.com/dms/image/C5603AQE-2yjN37Aazw/profile-displayphoto-shrink_800_800/0?e=1547078400&v=beta&t=EwaD-eLG1SVr7tLI-IWx8hZBUTKA1cnLH8ejPR12OTU"/></div>
      </td>
      </tr>
      <tr>
      <td>
        <div><About name="Dan Genzelev" linkedin = "https://www.linkedin.com/in/daniel-genzelev-525018134/" facebook ="https://www.facebook.com/dan.genzelev" desc1 = "Backend Developer" desc2 = "Team Member" desc3 = "Skiier" image = "https://scontent-atl3-1.xx.fbcdn.net/v/t1.0-9/32258019_1757806370925311_2388441659881816064_n.jpg?_nc_cat=109&_nc_ht=scontent-atl3-1.xx&oh=0c282c6d1c0427def4d483061a2086d9&oe=5C71A5F7"/></div>
        </td>
        <td>
        <div><About name="Jake Nachlas" linkedin = "https://www.linkedin.com/in/jakenachlas/" facebook ="https://www.facebook.com/JakeNachlas" desc1 = "Backend Developer" desc2 = "Team Member" desc3 = "CS Major" image = "https://scontent-atl3-1.xx.fbcdn.net/v/t1.0-9/23905186_1511312482289905_2885689362458524808_n.jpg?_nc_cat=102&_nc_ht=scontent-atl3-1.xx&oh=91b7361456cb3edfb9b73c5475722aaa&oe=5C70CFD5"/></div>
        </td>
        <td>
        <div><About name="Luke Rodin" linkedin = "https://www.linkedin.com/in/lrodin/" facebook ="https://www.facebook.com/luke.rodin" desc1 = "Backend Developer" desc2 = "Team Member" desc3 = "Family Man" image = "https://scontent-atl3-1.xx.fbcdn.net/v/t1.0-9/18446626_10210264165943714_6720403688278189066_n.jpg?_nc_cat=110&_nc_ht=scontent-atl3-1.xx&oh=9c6f4049c77f29ea3699abd8e9c936ba&oe=5C75A37E"/></div>
        </td>
        </tr>
        </tbody>
        </table>
      </div>

    );
  }
}
