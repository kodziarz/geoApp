import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import AdminPageItem from './AdminPageItem';
import Button from './Button';
import { deleteUser, getUsersList } from './Networking';

export default class AdminPage extends Component {

    #userListPromise

    constructor(props) {
        let p = getUsersList()
        super(props);
        this.state = {
            data: [
                { login: "test", password: "test" }
            ]
        };
        this.#userListPromise = p
    }

    componentDidMount = async () => {
        let response = await this.#userListPromise
        if (!response.ok)
            return alert("Błąd połączenia z serwerem")
        this.setState({ data: await response.json() })
    }

    delUser = (user) => {
        deleteUser(user.login, user.password)
        this.setState({
            data: this.state.data.filter(({ login, password }) => {
                return login !== user.login
            })
        })
    }

    displayDetail = (user) => {
        this.props.navigation.navigate('userDetail', user)
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Button style={{ flex: 1 }} text="Back to login page"
                    onPress={() => { this.props.navigation.navigate("main") }} />
                <FlatList style={{ flex: 1 }} data={this.state.data}
                    renderItem={({ item }) => {
                        return <AdminPageItem style={{ flex: 1 }} id={0} user={item}
                            onDelete={() => { this.delUser(item) }}
                            onDetail={this.displayDetail} />
                    }} />
            </View>
        );
    }
}
