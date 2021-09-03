import React from 'react';
import { Card, Button } from 'react-bootstrap';

class Employee extends React.Component {
    EmployeeCard = () => {
        return <Card office={this.props.employee.office}>
            <Card.Img variant="top" src={this.props.employee.imageUrl} />
            <Card.Body>
                <Card.Title>{this.props.employee.name}</Card.Title>
                <Card.Text>
                    {this.props.employee.flag} <span>{this.props.employee.office}</span>
                </Card.Text>
                <Button href={`https://tretton37.com/meet/${this.props.employee.detailsPath}`} variant="primary">Get to know me</Button>
            </Card.Body>
        </Card>;
    };


    render() {
        return this.EmployeeCard();
    };
};

export default Employee