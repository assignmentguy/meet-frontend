import React from 'react';
import { Container, Col, Row, Spinner, Dropdown, InputGroup, FormControl } from 'react-bootstrap';

import { MeetApi } from '../services/apis/meet-api';
import Employee from '../components/employee-component';

class Meet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            employees: [],
            offices: [],
            error: null,
            searchString: '',
            selectedOffice: ''
        };
    };

    async componentDidMount() {
        try {
            const employees = await MeetApi.employees;
            const emplyeesJson = await employees.json();
            let offices = emplyeesJson
                .map(employee => employee.office)
                .filter((office, index, offices) => offices.indexOf(office) === index);
            this.setState({
                employees: emplyeesJson,
                offices
            });
        } catch (error) {
            this.setState({
                error
            });
        };
    };

    onOfficeChange(office) {
        this.setState({
            selectedOffice: office
        });
    };

    onSearchStringChange(event) {
        this.setState({
            searchString: event.target.value
        });
    };

    shouldEmployeeRender(employee) {
        if (this.state.selectedOffice) {
            let skip = employee.office !== this.state.selectedOffice;
            if (skip) return false;

        };
        if (this.state.searchString) {
            const filterOnName = employee.name.toLowerCase().includes(this.state.searchString.toLocaleLowerCase());
            return filterOnName ? employee : false;
        };

        return true;
    }

    FilterContainer() {
        return <Container>
            <Row>
                <Col>
                    <InputGroup className="mb-3">
                        <FormControl aria-label="Search field" onChange={this.onSearchStringChange.bind(this)} />
                    </InputGroup>
                </Col>
                <Col>
                    <Dropdown >
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            {this.state.selectedOffice ? this.state.selectedOffice : "Office"}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {this.state.offices.map(office => (
                                <Dropdown.Item onClick={() => this.onOfficeChange(office)} value={office} key={office}>{office}</Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
            </Row>

        </Container>;
    };

    EmployeesContainer() {
        return <Container>
            <Row>
                {
                    this.state.employees.filter((employee) => {
                        return this.shouldEmployeeRender(employee) ? employee : null
                    }).map((employee, index) => (
                        <Col lg={3} sm={6} xs={12}>
                            <Employee employee={employee} />
                        </Col>
                    ))}
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
                <div>
                    {this.FilterContainer()}
                    {this.EmployeesContainer()}
                </div>
            );
        };
    };
};

export default Meet


