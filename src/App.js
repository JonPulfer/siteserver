import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import SiteNav from './Navigation';
import './App.css';
import axios from 'axios';
import {BrowserRouter as Router, Route} from "react-router-dom";

// Apex landing page. This currently has nothing particularly interesting on it but will include other components as I
// experiment more with React.
class Index extends Component {
  render() {
    return (
      <div className="App">
        <SiteNav pageName="Index"/>
        <Jumbotron fluid>
          <h1>Hello, world!</h1>
          <p>
            Here be dragons...
          </p>
        </Jumbotron>
        <p>
          Home to things I'm currently messing around with.
        </p>
      </div>
    );
  }
}

function AppRouter() {
  return (
    <Router>
      <div>
        <Route path="/" exact component={Index}/>
        <Route path="/travel/" component={TravelInfo}/>
        <Route path="/about/" component={About}/>
        <Route path="/afrita/" component={Afrita}/>
      </div>
    </Router>
  );
}

export default AppRouter;

function TwitterScript() {
  const scriptDetails = "window.twttr = function (d, s, id) {\n" +
    "      var js, fjs = d.getElementsByTagName(s)[0],\n" +
    "      t = window.twttr || {};\n" +
    "      if (d.getElementById(id)) return t;\n" +
    "      js = d.createElement(s);\n" +
    "      js.id = id;\n" +
    "      js.src = \"https://platform.twitter.com/widgets.js\";\n" +
    "      fjs.parentNode.insertBefore(js, fjs);\n" +
    "\n" +
    "      t._e = [];\n" +
    "      t.ready = function (f) {\n" +
    "      t._e.push(f);\n" +
    "    };\n" +
    "      return t;\n" +
    "    }(document, \"script\", \"twitter-wjs\")";

  ReactDOM.render(scriptDetails, document.getElementById('twitterScript'))
}

// /travel page that loads content from APIs and aggregates the information that is relevant for my common journeys
// like my commute.
class TravelInfo extends Component {

  componentDidMount() {
    TwitterScript();
  }

  render() {
    return (
      <div className="App">
        <SiteNav pageName="Travel"/>
        <Jumbotron fluid>
          <h1>Hello, world!</h1>
          <p>
            Here be dragons...
          </p>
        </Jumbotron>
        <Container>
          <Row>
            <Col>
              <LoadTfLTubeLineStatus/>
            </Col>
            <Col>
              <Card>
                <Card.Header>Anglia Overground Rail</Card.Header>
                <Card.Body>
                  <a className="twitter-timeline" data-width="220" data-height="400"
                     href="https://twitter.com/greateranglia?ref_src=twsrc%5Etfw">Tweets by greateranglia</a>
                  <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
                </Card.Body>
              </Card>
              <LoadTfLLivStrStationStatus/>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

// Load the line status information for the selected lines from the TfL API.
class LoadTfLTubeLineStatus extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lineStatus: []
    }
  }

  componentDidMount() {
    axios.get('https://api.tfl.gov.uk/Line/circle%2Chammersmith-city%2Cmetropolitan%2Cvictoria/Status', {
      params: {
        app_id: '40643cfa',
        app_key: '5fe0a9809625e701fdc1e05bad9aaaac',
        detail: true
      }
    })
      .then(json => this.setState({
        lineStatus: json.data
      }))
      .catch(error => alert(error))
  }

  render() {
    return (
      <ListGroup>
        <Card>
          <Card.Header>Tube line Status</Card.Header>
          <Card.Body>
            <ListGroup><TfLLineList lines={this.state.lineStatus}/></ListGroup>
          </Card.Body>

        </Card>
      </ListGroup>
    )
  }
}

// For the provided list of TfL lines, render as a list the cards containing the details.
function TfLLineList(props) {
  const lines = props.lines;
  const lineItems = lines.map((line) =>
    <Card key={line.id}>
      <Card.Header>{line.name}</Card.Header>
      <Card.Body>
        <TfLLineStatusList lineStatuses={line.lineStatuses}/>
      </Card.Body>
    </Card>
  );

  return (
    <ListGroup>{lineItems}</ListGroup>
  );
}

// Render the details of a line status as a card to be placed in a list.
function TfLLineStatusList(props) {
  const lines = props.lineStatuses;
  const lineStatusItems = lines.map((status, index) =>
    <div key={index}>
      <h4>{status.statusSeverityDescription}</h4>
      <p>{status.reason}</p>
      <hr/>
    </div>
  );

  return (
    <ListGroup>{lineStatusItems}</ListGroup>
  );
}

// Load the Liverpool street station disruption information from the TfL API.
class LoadTfLLivStrStationStatus extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      livStreetStatus: []
    }
  }

  componentDidMount() {
    axios.get('https://api.tfl.gov.uk/StopPoint/HUBLST/Disruption', {
      params: {
        app_id: '40643cfa',
        app_key: '5fe0a9809625e701fdc1e05bad9aaaac',
        getFamily: false,
        includeRouteBlockedStops: false,
      }
    })
      .then(json => this.setState({
        livStreetStatus: json.data
      }))
      .catch(error => alert(error))
  }

  render() {
    return (
      <Card>
        <Card.Header>Liverpool Street disruptions</Card.Header>
        <Card.Body>
          <ListGroup>
            {this.state.livStreetStatus.fromDate}<br/>
            {this.state.livStreetStatus.toDate}<br/>
            <p>{this.state.livStreetStatus.description}</p>
          </ListGroup>
        </Card.Body>
      </Card>
    )
  }
}

class About extends Component {
  render() {
    return (
      <div className="App">
        <SiteNav pageName="About"/>
        <Jumbotron fluid>
          <h1>Hello, world!</h1>
          <p>
            Here be dragons...
          </p>
        </Jumbotron>
        <Container>
          <Row>
            <Col>
              <div className="narrow">
                <p>
                  I'm a programmer (predominantly Go and Rust) living in Ipswich and currently commuting into London.
                  Although this does mean I travel more than some, it enables me to work with some really interesting
                  people using technology that challenges me. I enjoy helping people and fixing things, which provides
                  me with plenty to learn and helps keep me energised.
                </p>
                <p>
                  I'm always happy to hear about new opportunities and welcome connections via one of the social
                  accounts in the links at the top.
                </p>
                <p>
                  When I'm not working, the main draw on my time is <a href="/afrita">Afrita</a>.
                </p>
                <p>Other sports/hobbies I enjoy are: -</p>
              </div>
            </Col>
          </Row>
          <Row>
            <CardColumns>
              <Card>
                <Card.Header>
                  Painting
                </Card.Header>
                <Card.Body>
                  <p>
                    I've never formally studied any art disciplines but I really enjoy trying out different things,
                    learning
                    as I go. A friend of mine recently laughed when viewing my first self portrait saying that it
                    reminded him of the faces on the Thomas the tank engine trains. Not quite what I was aiming for but
                    at least it brought him some laughter for a while.
                  </p>
                  <p>
                    I've settled on using acrylics as my medium as I really like the flexibility of being able to paint
                    on
                    any (primed) surface and work fast. As always, getting something on the surface to start a painting
                    is
                    pretty daunting but I counter that by blocking out with a ground wash before starting to put other
                    marks
                    down.
                  </p>
                </Card.Body>
              </Card>
              <Card>
                <Card.Img variant="top" src="/remote_road.png"/>
                <Card.Header>
                  Remote road
                </Card.Header>
                <Card.Body>
                  <p>
                    This was inspired by a number of remote roads I drove through on trips to Scotland.
                  </p>
                </Card.Body>
              </Card>
              <Card style={{width: '18rem'}}>
                <Card.Img variant="top" src="/self_portrait.png"/>
                <Card.Header>
                  First self portrait
                </Card.Header>
                <Card.Body>
                  <p>
                    I wanted to try and see if I could capture a realistic expression and hopefully create something
                    that
                    was recognisable as me.
                  </p>
                </Card.Body>
              </Card>
              <Card>
                <Card.Img variant="top" src="/guitar.png"/>
                <Card.Header>
                  Guitar
                </Card.Header>
                <Card.Body>
                  <p>
                    From an early age I attempted to play guitars. Both my brother and myself eventually got to spend
                    some
                    time taking lessons from an excellent teacher/session musician. Competition between my brother and I
                    always motivated us to learn more until inevitably his more creative nature elevated his abilities
                    beyond
                    my reach.
                  </p>
                  <p>
                    I've owned a few guitars over the years. Like most hobbies, buying a new guitar is quite an
                    addictive
                    thing. I have worked very hard to resist that in recent years and this is currently the only guitar
                    I
                    have left.
                  </p>
                </Card.Body>
              </Card>
              <Card>
                <Card.Header>
                  Music
                </Card.Header>
                <Card.Body>
                  <p>
                    Following my interest in playing guitar, I have always enjoyed listening to music. I was lucky that
                    various people introduced me to different styles and my taste now is very varied. My grandfather
                    particularly instilled an appreciation for classical piano by picking out particularly beautiful
                    pieces to captivate me.
                  </p>
                  <p>
                    I also enjoy experiencing live performances when I remember to organise the tickets!
                  </p>
                </Card.Body>
              </Card>
              <Card>
                <Card.Header>
                  Running
                </Card.Header>
                <Card.Body>
                  <p>
                    I enjoy most sports and actively visit the gym for general fitness. More recently I have increased
                    the amount of running I do with the aim of doing half marathons.
                  </p>
                </Card.Body>
              </Card>
              <Card style={{width: '18rem'}}>
                <Card.Img variant="top" src="/hat.png"/>
                <Card.Header>
                  Knitting
                </Card.Header>
                <Card.Body>
                  <p>
                    I enjoy knitting as I find it relaxes me and allows my mind to be quiet for a time while I focus on
                    the pattern and work with my hands. This hat was the first project that I actually managed to
                    complete
                    and as an extra bonus it mostly fits over my head!
                  </p>
                </Card.Body>
              </Card>
              <Card>
                <Card.Header>
                  Sewing and making clothes
                </Card.Header>
                <Card.Body>
                  <p>
                    Among the many talents my grandmother has, dress design has been a passion and career for her. She
                    took the time to nurture my interest and I have learned a great deal from her skill and experience.
                  </p>
                  <p>
                    I enjoy working in traditional ways and own a Singer 201 treadle which I use as my main machine when
                    making garments.
                  </p>
                </Card.Body>
              </Card>
            </CardColumns>
          </Row>
        </Container>
      </div>
    );
  }
}

class Afrita extends Component {
  render() {
    return (
      <div className="App">
        <SiteNav pageName="Afrita"/>
        <Jumbotron fluid>
          <h1>Hello, world!</h1>
          <p>
            Here be dragons...
          </p>
        </Jumbotron>
        <Container>
          <Row>
            <Col xs lg="4">
              <Card>
                <Card.Img variant="top" src="/Afrita.png"/>
                <Card.Header>
                  Afrita
                </Card.Header>
                <Card.Body>
                  <p><a href="https://www.c032.org/">Contessa 32</a></p>
                  <ListGroup>
                    <li>Length (LOA): 32 ft / 9.75m</li>
                    <li>Width (Beam): 10ft / 3m</li>
                    <li>Keel (Draft): 5ft 6in / 1.75m</li>
                    <li>Year (Launched): 1978</li>
                    <li><a href="https://www.vesselfinder.com/?mmsi=235118438">Current Position</a></li>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card>
                <Card.Body>
                  <p>
                    Afrita was completed in 1978 by the Jeremy Rogers boat yard in Lymington.
                    Originally she was called Sunrise and then, at some point before 1984, her name was changed. I
                    purchased Afrita from a lovely family in Scotland in 2016 and have been enjoying sailing her ever
                    since.
                  </p>
                  <p>
                    Currently Afrita is berthed at Ipswich Haven marina in the historic dock in town. This is only a
                    few minutes walk from home, or to one of the local cafes/restaurants or shops.
                  </p>
                  <p>
                    I'm still building up my offshore experience with the goal to eventually cross oceans. My dream is
                    to explore the pacific islands. Particularly Galapagos, Hawaii, French Polynesia and Fiji before
                    arriving in Sydney. What I'll do if I make it that far is not in the dream at the moment so who
                    knows!
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}