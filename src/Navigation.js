import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function SocialNav() {
  return (
    <Nav>
      <Nav.Link href="https://keybase.io/jonp">Keybase</Nav.Link>
      <Nav.Link href="https://github.com/jonpulfer">Github</Nav.Link>
      <Nav.Link href="https://www.linkedin.com/in/jon-pulfer-3b407b2/">LinkedIn</Nav.Link>
      <Nav.Link href="https://twitter.com/jonathanpulfer">@jonathanpulfer</Nav.Link>
    </Nav>
  );
}

function NavItem(props) {

  if (props.title === props.pageName) {
    return <Nav.Link href={props.path} active>{props.title}</Nav.Link>
  } else {
    return <Nav.Link href={props.path}>{props.title}</Nav.Link>
  }

}

function NavItems(props) {
  const pageItems = props.pageItems;
  const pageName = props.pageName;
  const pages = pageItems.map((page) =>
    <NavItem key={page.title} path={page.path} title={page.title} pageName={pageName}/>
  );

  return (
    <Nav className="mr-auto">
      {pages}
    </Nav>
  )
}

class SiteNav extends React.Component {
  constructor(props) {
    super(props);
    this.pageName = props.pageName;
    this.pages = [
      {
        path: "/about",
        title: "About",
      },
      {
        path: "/afrita",
        title: "Afrita",
      },
      {
        path: "/travel",
        title: "Travel",
      }
    ];
  }

  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">Jonathan Pulfer</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <NavItems pageItems={this.pages} pageName={this.pageName}/>
          <SocialNav/>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default SiteNav;