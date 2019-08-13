import React from 'react';
import { withRouter } from 'react-router-dom';
import { inject } from 'mobx-react';


@inject('httpService')
class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };
    }

    onInputChanged = (event) => {
        const target = event.target;
        if (target.name === 'username') {
            this.setState({
                username: target.value
            });
        } else if (target.name === 'password') {
            this.setState({
                password: target.value
            });
        }
    }

    login = () => {
        this.props.httpService.login(
            this.state.username,
            this.state.password
        ).then(token => {
            const { history } = this.props;
            history.push('/');
        });
    }

    render() {
        return (
            <div>
                <div>
                    <p>
                        <label>아이디: </label>
                        <input type="text" value={this.state.username}
                            onChange={this.onInputChanged}
                            name="username" />
                    </p>
                    <p>
                        <label>비밀번호: </label>
                        <input type="password" value={this.state.password}
                            onChange={this.onInputChanged}
                            name="password" />
                    </p>
                    <button onClick={this.login}>로그인</button>
                </div>
            </div>
        );
    }
}

export default withRouter(Login);