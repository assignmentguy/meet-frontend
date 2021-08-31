import React from 'react';
class Meet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            employees: [],
            error: null
        }
    }
    componentDidMount() {
        fetch('http://localhost:1337/employees').then(res => res.json()).then(result => {
            this.setState({
                employees: result
            });
        }, error => {
            this.setState({
                error
            })
        });

    };

    render() {
        const { employees, error } = this.state;
        if (error) {
            console.log(error);
            return <div>Ops! - Something didn't go to well :( {error.message}</div>;
        } else if (!employees.length) {
            return <div>This is a beautiful spinner!</div>;
        } else {
            return (
                <div>
                    {employees.map(item => (
                        <h1>{item.name}</h1>
                    ))}
                </div>
            )
        }

    };
};


export default Meet
