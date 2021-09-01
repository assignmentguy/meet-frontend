import React from 'react';
import { Card, Button, Container, Col, Row, Spinner } from 'react-bootstrap'

import { MeetApi } from '../services/apis/meet-api'

class MeetComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            employees: [],
            error: null,
            filterOnOffice: null,
        };
    };

    async componentDidMount() {
        try {
            const employees = await MeetApi.employees;
            const emplyeesJson = await employees.json();
            this.setState({
                employees: emplyeesJson
            });
        } catch (error) {
            this.setState({
                error
            });
        };
    };

    employeeCard = (employee) => {
        return <Card >
            <Card.Img variant="top" src={employee.imageUrl} />
            <Card.Body>
                <Card.Title>{employee.name}</Card.Title>
                <Card.Text>
                    {employee.flag} <span>{employee.office}</span>
                </Card.Text>
                <Button href={`https://tretton37.com/meet/${employee.detailsPath}`} variant="primary">Get to know me</Button>
            </Card.Body>
        </Card>;
    };

    employeeCol = (employee) => {
        return <Col lg={3} sm={6} xs={12}>
            {this.employeeCard(employee)}
        </Col>;
    };

    employeesContainer = () => {
        return <Container>
            <Row>
                {
                this.state.employees.filter((employee) => {
                    if (this.state.filterOnOffice) return employee.office === '';
                    return employee
                }).map((employee, index) => (
                    this.employeeCol(employee)
                ))};
            </Row>
        </Container>;
    };
    
    render() {
        const { employees, error } = this.state;
        if (error) {
            return <div>Ops! - Something didn't go to well :( {error.message}</div>;
        } else if (!employees.length) {
            return <Spinner animation="border" variant="primary" size="lg" />;
        } else {
            return (
                this.employeesContainer()
            );
        };
    };
};

export default MeetComponent


