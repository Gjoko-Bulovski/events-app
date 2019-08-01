import React, { Component } from 'react';
import { Button, Accordion, ButtonToolbar, Card, Modal, Form} from 'react-bootstrap';
import { Redirect, Link } from 'react-router-dom';

class Event extends Component {
  state = {
    events: [
      { eventName: 'Metallica', eventDate: '07.08.2019', eventDiscription: 'Concert' },
      { eventName: 'Beyonce', eventDate: '09.09.2019', eventDiscription: 'Concert' },
      { eventName: 'Maluma', eventDate: '10.10.2019', eventDiscription: 'Concert' }
    ],
    showAdd: false,
    showEdit: false,
    showAddDelete: false,
    currentIndex: null,
    newestEvent: { eventName: '', eventDate: '', eventDiscription: '' }
  }
  //Deletes a Event
  deleteEvent(currentIndex) {
    let events = this.state.events.slice();
    events.splice(currentIndex, 1);
    localStorage.setItem('events', JSON.stringify(events));
    this.setState({ events });
    this.close();
  }
  //Update newestEvent
  updateNewEvent(eventName, eventDate, eventDiscription) {
    this.setState({ newestEvent: { eventName: eventName, eventDate: eventDate, eventDiscription: eventDiscription } })
  }
  //Saves a new event to events
  saveNewEvent() {
    let events = this.state.events.slice();
    events.push({ eventName: this.state.newestEvent.eventName, eventDate: this.state.newestEvent.eventDate, eventDiscription: this.state.newestEvent.eventDiscription });
    localStorage.setItem('events', JSON.stringify(events));
    this.setState({ events });
    this.setState({ newestEvent: { eventName: '', eventDate: '', eventDiscription: '' } });
    this.close();
  }
  //Close a modal
  close = () => {
    if (this.state.showAdd) {
      this.setState({ showAdd: false });
    }
    if (this.state.showEdit) {
      this.setState({ showEdit: false });
    }
    if (this.state.showAddDelete) {
      this.setState({ showAddDelete: false });
    }
    this.setState({ currentIndex: null });
  }
  //Open a modal
  open = (state, currentIndex) => {
    this.setState({ [state]: true });
    if (currentIndex >= 0) {
      this.setState({ currentIndex });
    } else {
      this.setState({ currentIndex: null });
    }
  }
  //update event name
  updateEventName(eventName, currentIndex) {
    let events = this.state.events.slice();
    events[currentIndex] = { ...events[currentIndex], eventName };
    localStorage.setItem('events', JSON.stringify(events));
    this.setState({ events });
  }
  //update Event Date
  updateEventDate(eventDate, currentIndex) {
    let events = this.state.events.slice();
    events[currentIndex] = { ...events[currentIndex], eventDate };
    localStorage.setItem('events', JSON.stringify(events));
    this.setState({ events });
  }
  //update Discription
  updateDiscription(eventDiscription, currentIndex) {
    let events = this.state.events.slice();
    events[currentIndex] = { ...events[currentIndex], eventDiscription };
    localStorage.setItem('events', JSON.stringify(events));
    this.setState({ events });
  }
  //Local Storage
  componentDidMount() {
    let events = typeof (localStorage['events']) !== 'undefined' ? JSON.parse(localStorage.getItem('events')) : [
      { eventName: 'Metallica', eventDate: '07.08.2019', eventDiscription: 'Concert' },
      { eventName: 'Beyonce', eventDate: '09.09.2019', eventDiscription: 'Concert' },
      { eventName: 'Maluma', eventDate: '10.10.2019', eventDiscription: 'Concert' }
    ];
    this.setState({ events });
  }
  //Sign Out
  signOut() {
    localStorage.clear("login");
    localStorage.setItem("login", false);
  }
  render() {
    let { events, newestEvent, currentIndex } = this.state;
    let isLoggedIn = localStorage.getItem("login") === "true";
    if (!isLoggedIn) {
      return <Redirect to="/" />;
    } else {
      return (
        <div className='container' >
          <Button variant="primary" onClick={() => this.open("showAdd")}>Add New Event</Button>
          {events.length > 0 && (
            <div>
              <Accordion>
                {events.map((event, index) => (
                  <Card key={index}>
                    <Card.Header>
                      <Accordion.Toggle as={Button} variant="link" eventKey={index}>
                        {event.eventName}
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey={index}>
                      <Card.Body>Event Date: {event.eventDate}</Card.Body>
                    </Accordion.Collapse>
                    <Accordion.Collapse eventKey={index}>
                      <Card.Body>Event Description: {event.eventDiscription}</Card.Body>
                    </Accordion.Collapse>
                    <ButtonToolbar>
                      <Button variant="outline-secondary" size="sm" title='Edit Button' onClick={() => this.open('showEdit', index)}><i className="far fa-edit"></i></Button>
                      <Button variant="outline-danger" size="sm" title='Delete Button' onClick={() => this.open('showAddDelete', index)}><i className="fas fa-trash-alt"></i></Button>
                    </ButtonToolbar>
                  </Card>
                ))}
              </Accordion>
              {currentIndex != null && (
                <Modal show={this.state.showEdit} onHide={this.close}>
                  <Modal.Header closeButton>
                    <Modal.Title>Edit Event</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                      <Form.Group>
                        <Form.Label>Event Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Event Name"
                          value={events[currentIndex].eventName}
                          onChange={(event) => this.updateEventName(event.target.value, currentIndex)}
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Event Date</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Event Date"
                          value={events[currentIndex].eventDate}
                          onChange={(event) => this.updateEventDate(event.target.value, currentIndex)}
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Event Discription</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Event Discription"
                          value={events[currentIndex].eventDiscription}
                          onChange={(event) => this.updateDiscription(event.target.value, currentIndex)}
                        />
                      </Form.Group>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button onClick={this.close}>Save</Button>
                  </Modal.Footer>
                </Modal>
              )}
            </div>
          )}
          <Modal show={this.state.showAdd} onHide={this.close}>
            <Modal.Header closeButton>
              <Modal.Title>Add Event</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group>
                  <Form.Label>Event Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Event Name"
                    onChange={(event) => this.updateNewEvent(event.target.value, newestEvent.eventDate, newestEvent.eventDiscription)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Event Date</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Event Date"
                    onChange={(event) => this.updateNewEvent(newestEvent.eventName, event.target.value, newestEvent.eventDiscription)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Event Discription</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Event Discription"
                    onChange={(event) => this.updateNewEvent(newestEvent.eventName, newestEvent.eventDate, event.target.value)}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => this.saveNewEvent()}>Save New Event</Button>
            </Modal.Footer>
          </Modal>
          <Modal show={this.state.showAddDelete} onHide={this.close}>
            <Modal.Header closeButton>
              <Modal.Title>Event</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete this item?</Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={() => this.deleteEvent(currentIndex)}>
                OK
            </Button>
                <Button variant="secondary" onClick={this.close}>
                  Cancel
            </Button>
            </Modal.Footer>
          </Modal>
          <Link to='/'>
            <Button className="signOut" onClick={() => this.signOut()}>Sign Out</Button>  
          </Link>
        </div>
      );
    }
  }
}

export default Event;
