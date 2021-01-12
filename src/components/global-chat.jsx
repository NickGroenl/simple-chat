import React , {Component} from 'react';



class GlobalChat extends Component {
    constructor(){
        super();
        this.state = {
            scrollCount : 100,
            input: '',
            messages : []
        }
    }
    componentDidMount(){
        window.firebase.database().ref('messages/').on('value', snap =>{
            const current = snap.val();
            if(current != null)
            {
                this.setState({
                    messages : current
                });
            }
        })
    }
    updateMessage(e)
    {
        e.preventDefault();
        this.setState({ input : e.target.value})
    }
    sendMessage(e) {
        e.preventDefault();
        const list = this.state.messages;
        var today = new Date();
        const newMessage = {
            id_message: this.state.messages.length,
            text_message: this.state.input,
            time_message: today.getHours() + ':' + today.getMinutes(),
            name_message: 'Xylos'

            
        }
        list.push(newMessage);

        let actually = 12000;
        this.setState({messages : list})
        this.setState({scrollCount : actually});
        window.firebase.database().ref(`messages/${newMessage.id_message}`).set(newMessage);
        let scrollTops = document.getElementById("scroll-chat");
        scrollTops.scrollTop = this.state.scrollCount;
    }
    
    render(){
        return(
            <div className="body-chat">
                <div className="header-chat">
                    <img src='https://avatars1.githubusercontent.com/u/57513207?s=460&u=661f478c67541b0055ba2a0078c47c2214f35758&v=4' alt="profile logo"></img>
                    <h1>Xylospeed</h1>
                    
                </div>
                <div className="in-chat" id="scroll-chat">
                    <ul>
                    {
                        this.state.messages.map(function(message) {
                            return <li key={message.id}>
                                <div className="box-chat">
                                    <h4> {message.name_message}</h4>
                                    <p> {message.text_message}</p>
                                </div>
                                <p>{message.time_message}</p>
                            </li>
                        })
                    }
                    </ul>
                </div>
                <form className="send-chat" onSubmit={this.sendMessage.bind(this)}>
                    <input type="text" placeholder="Ingresa un mensaje" onChange={this.updateMessage.bind(this)}/>
                    <button type="submit"><ion-icon name="send-outline"></ion-icon></button>
                </form>
                
            </div>
            
        )
    }
}
export default GlobalChat;