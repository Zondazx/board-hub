import React from 'react';
import styled from 'styled-components/macro';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
  Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import BeenhereIcon from '@material-ui/icons/Beenhere';
import FaceIcon from '@material-ui/icons/Face';

import ButtonWithPrompt from '../components/ButtonWithPrompt';

import teamStock from '../images/team-stock.png';
import card from '../images/card.svg';
import review from '../images/review.svg';
import note from '../images/note.svg';


const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 1000,
    margin: '0 15px',
  },

  media: {
    height: 0,
    paddingTop: '94.25%'
  },

  container: {
    justifyContent: 'center',
    marginBottom: '40px',
    '& > *': {
      textAlign: 'center',
    },
  },
}));

const Background = styled.div`
  background-image: linear-gradient(
    66deg,rgba(0,0,0,.85),
    rgba(0,0,0,.5) 25%,
    rgba(0,0,0,.3) 50%,
    rgba(0,0,0,.1) 75%,
    rgba(0,0,0,0)),
    url(${teamStock}
  );
  background-repeat: round;
  padding: 50px 0;
`;

const Banner = styled.div`
  width: 700px;
  height: 100%;
  text-align: center;
  padding-top: 100px;
  margin: 0 auto;

  h2 {
    margin-bottom: 50px;
  }
`;

const Separation = styled.div`
  padding-top: 20px;
  padding-bottom: 5px;
  background-color: #7362d0;
  display: block;
  text-align: center;
  margin-bottom: 40px;

  div {
    margin-top: 5px;
  }
`;

const Highlight = styled.strong`
  color: #7362d0;
`;

const Home = (props) => {
  const { root, container, media, adapt } = useStyles();

  return (
    <>
      <Background>
        <Banner>
          <Typography variant='h2' color='primary'>
            Aumenta <strong>tu</strong> eficiencia o la de tu <strong>equipo</strong>
          </Typography>

          <ButtonWithPrompt> 
            <strong>Empieza Ya</strong>
            <span></span>
          </ButtonWithPrompt>
        </Banner>
      </Background>

      <Separation>
        <Typography variant='h3' color='primary'>
          Lo que te ofrecemos
        </Typography>
        <Typography variant='caption' color='primary'>
          Mantenido de forma abierta y transparente, completamente gratis.
        </Typography>
        <div>
          <BeenhereIcon color='primary' fontSize='large'/>
        </div>
      </Separation>
      
      <Grid container spacing={30} className={container}>
        <Grid item md={3}>
          <Card className={root}>
            <CardHeader title='Organización' subheader='Se adaptan a ti.' />
            <CardMedia title='Organización' className={media} image={card}/>
            <CardContent>
              <Typography variant='body2' component='p'>
                Organiza a tu manera, sin <Highlight>limites</Highlight>.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item md={3}>
          <Card className={root}>
            <CardHeader title='Creación' subheader='Consistentes y sencillas de hacer.' />
            <CardMedia title='Creación' className={media} image={note}/>
            <CardContent className={adapt}>
              <Typography variant='body2' component='p'>
                Crea nuevas listas y cartas con <Highlight>facilidad</Highlight>.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item md={3}>
          <Card className={root}>
            <CardHeader title='Busquedas' subheader='Fáciles y rapidas de realizar.' />
            <CardMedia title='Busquedas' className={media} image={review}/>
            <CardContent>
              <Typography variant='body2' component='p'>
                Accede rápidamente a tus <Highlight>cartas</Highlight>.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Separation>
        <Typography variant='h3' color='primary'>
          Nuestra misión
        </Typography>
        <Typography variant='caption' color='primary'>
          La razón detrás de esto es simple, somos como tú.
        </Typography>
        <div>
          <FaceIcon color='primary' fontSize='large'/>
        </div>
      </Separation>
    </>
  );
};

export default Home;