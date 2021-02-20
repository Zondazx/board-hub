import React from 'react';
import styled from 'styled-components/macro';
import clsx from 'clsx';
import {
  Card,
  CardContent,
  CardActions,
  Grid,
  Button,
  IconButton,
  Typography,
  makeStyles,
} from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';

import { Link } from 'react-router-dom';

import useToggle from '../hooks/useToggle';

import ConfirmationDialog from '../components/ConfirmationDialog';
import Highlight from '../components/Highlight';

import lost from '../assets/svgs/lost.svg';
import working from '../assets/svgs/working.svg';
import help from '../assets/svgs/help.svg';

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: 275,
    minHeight: 170,
    margin: '40px 20px',
  },
  favoriteButton: {
    marginBottom: 3,
  },
  deleteButton: {
    color: theme.palette.error.main,
  },
  isFavorite: {
    color: 'gold',
  },
  top: {
    fontSize: 14,
  },
  name: {
    marginBottom: 12,
  },
  container: {
    justifyContent: 'center',
  },
}));

const MessageContainer = styled.div`
  display: inline-block;
  border: 2px solid #7362d0;
  border-radius: 10px;
  width: 40%;
  margin: ${({ margin }) => margin}px 65px;

  p {
    padding: 20px;
    text-align: center;
  }

  img {
    display: block;
    margin: 0 auto;
  }
`;

const Separator = styled.div`
  height: 100px;
  background-color: #7362d0;
  text-align: center;

  h4 {
    padding-top: 10px;
  }
`;

const BoardsDisplay = ({ boards }) => {
  const classes = useStyles();
  const [isOpen, toggleOpen] = useToggle();

  return (
    <>
      <Grid container className={classes.container}>
        {boards.length > 0 ? boards.map((board, index) => (
          <Grid item md={3} key={`${board.name}-${index}`}>
            <Card className={classes.root} variant='outlined' color='secondary'>
              <CardContent>
                <Typography className={classes.top} color='textSecondary' gutterBottom>
                  {board.created.toString()}
                  <IconButton 
                    className={clsx(classes.favoriteButton, { [classes.isFavorite]: board.isFavorite })}
                    onClick={(() => console.log('new favorite'))}
                  >
                    <StarIcon />
                  </IconButton>
                </Typography>
                <Typography className={classes.name} color='secondary'>
                  {board.name}
                </Typography>
                <Typography variant='body2' component='p'>
                  {board.description || 'Este tablero no posee una descripción.'}
                  <br />
                </Typography>
              </CardContent>
              <CardActions>
                <Button size='small' component={Link} to='/b/id' variant='outlined'>Abrir</Button>
                <IconButton className={classes.deleteButton} onClick={toggleOpen}>
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        )) 
        : (
          <MessageContainer margin={50}>
            <img src={lost} alt='Lost' width='500px'/>
            <Typography variant='h5' gutterBottom>
              Parece que no hay nada aún.
            </Typography>
            <Typography gutterBottom>
              Pero eso no importa, empieza a tu ritmo, nosotros te seguiremos.
            </Typography>
            <IconButton 
              component={Link}
              to='/b/new'
              color='secondary'
            >
              <AddIcon />
            </IconButton>
          </MessageContainer>
        )}
        </Grid>
        {boards.length >= 1 && (
          <>
            <Separator>
              <Typography variant='h4'>
                <Highlight color='#ffffff'>¿Atascado?</Highlight>
                <div>
                  <SentimentVeryDissatisfiedIcon color='primary' fontSize='large' />
                </div>
              </Typography>
            </Separator>

            <MessageContainer margin={30}>
              <img src={working} alt='Working' width='450px'/>
              <Typography gutterBottom>
                Rompe tus tareas en trozos digeribles, pequeños y fáciles de procesar. Estos son mucho
                más fáciles de completar y te ayudan a cumplir tu meta de forma progresiva.
              </Typography>
            </MessageContainer>

            <MessageContainer margin={30}>
              <img src={help} alt='Working' width='450px'/>
              <Typography gutterBottom>
                Escribele a algún amigo o pide ayuda en linea. Siempre es mejor trabajar en equipo.
                Si no tienes a alguien disponible, intenta una comunidad en linea como <Highlight color='#00acee'>Twitter</Highlight> o <Highlight color='#7289da'>Discord</Highlight>.
              </Typography>
            </MessageContainer>
          </>
        )}
        <ConfirmationDialog isOpen={isOpen} handleClose={toggleOpen} />
      </>
  );
};

export default BoardsDisplay;