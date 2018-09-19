import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import MenuItem from '@material-ui/core/MenuItem'


const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
});

const fieldParams = ['Twin', 'Tripple', 'Quadro']



class DialogSelect extends Component {

  state = {
    open: false,
    items: [{
      selectNumber: 0,
      numberField: 0
    }],
    saveLetters: []
  };


  handleChangeItem = name => event => {
    const items = [...this.state.items]
    items[name]['selectNumber'] = event.target.value
    this.setState({ items });
  };

  addField = () => {
    const items = [...this.state.items]
    items.push({selectNumber: 0, numberField: 0})
    this.setState({
      items: items
    })
  }

  deleteField = (index) => {
    const items = [...this.state.items]
    items.splice(index, 1)
    this.setState({
      items: items
    })
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  save = () => {
    const items = [...this.state.items]
    this.setState({
      saveLetters: [...items],
      items: [{selectNumber: 0, SelectField: 0}],
      open: false
    })
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Button onClick={this.handleClickOpen}>Open select dialog</Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
        >
          <DialogTitle>
            Структура номеров
            <Button onClick={this.handleClose}>Close</Button>
          </DialogTitle>
          <DialogContent>
            <form className={classes.container} >
            {this.state.items.map((item, index) => 
              <FormControl className={classes.formControl} key={index}>
                <Select
                  name={`items.${index}.selectNumbe`}
                  value={item.selectNumber}
                  onChange={this.handleChangeItem(index)}
                  input={<Input id={`some${index}`} name={`items.${index}.selectNumbe`} />}
                >
                  {fieldParams.map((itemParam, index) => 
                      <MenuItem value={index} key={index}>{itemParam}</MenuItem>
                  )}
                </Select>

                <TextField
                  value={item.selectNumber}
                />

                <IconButton className={classes.button} aria-label="Delete" onClick={() => this.deleteField(index)}>
                   <DeleteIcon />
                </IconButton>
              </FormControl>
            )}

              <Button type="button" onClick={this.addField}>Добавить</Button>

            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.save} color="primary">
              Сохранить
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Отмена
            </Button>
          </DialogActions>
        </Dialog>
        <div>
          <div><h1>Сохраненные письма</h1></div>
          <div>
            {this.state.saveLetters.map((item, index) =>
              <div key={index}>{fieldParams[item.selectNumber]}</div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

DialogSelect.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DialogSelect);