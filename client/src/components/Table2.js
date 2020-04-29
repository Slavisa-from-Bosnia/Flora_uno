import React from "react";
import { render } from "react-dom";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "material-ui/Table";
import Paper from "material-ui/Paper";
import Button from "material-ui/Button";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {}
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        {
          name: "foo"
        },
        {
          name: "bar"
        },
        {
          name: "baz"
        }
      ]
    };
  }

  deleteItem(i) {
    const { items } = this.state;
    items.splice(i, 1);
    this.setState({ items });
  }

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.items.map((item, i) => {
              return (
                <TableRow key={`row-${i}`}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>
                    <Button
                      onClick={this.deleteItem.bind(this, i)}
                      color="secondary"
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}
const StyledApp = withStyles(styles)(App);
render(<StyledApp />, document.getElementById("root"));
