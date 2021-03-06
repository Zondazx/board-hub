import { useState } from 'react';
import { Backdrop, Typography, IconButton, Button } from '@material-ui/core';
import { useQueryClient, useQuery, useMutation } from 'react-query';
import ScaleLoader from 'react-spinners/ScaleLoader';
import ReactMarkdown from 'react-markdown';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/es-us';

import CreateIcon from '@material-ui/icons/Create';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import EventNoteIcon from '@material-ui/icons/EventNote';
import DehazeIcon from '@material-ui/icons/Dehaze';
import CloseIcon from '@material-ui/icons/Close';

import BaseDialog from '../BaseDialog';
import { Status } from 'components/boards';

import { useStyles, Field, NoDescription } from '../styles';

import { CustomField, Highlight } from 'components/common';

import apiClient from 'services/api';

import team from 'assets/images/team.png';

dayjs.extend(relativeTime);
dayjs.locale('es-us');

export const EditCardDialog = ({ cardId, handleClose }) => {
  const queryClient = useQueryClient();
  const { data: card, isLoading, isError } = useQuery('card', async () => {
    const { data } = await apiClient.get(`/cards/${cardId}`);
    return data;
  });
  const mutation = useMutation((data) => apiClient.put(`/cards/${cardId}`, data), {
    onSuccess: () => {
      queryClient.invalidateQueries('lists');
    },
  });
  const [isEditing, setIsEditing] = useState({
    title: false,
    duedate: false,
    content: false,
  });
  const classes = useStyles();

  const handleSubmit = async (data, { setStatus, setSubmitting }) => { 
    try {
      setSubmitting(true);

      const { data: { message } } = await mutation.mutateAsync(data);

      setSubmitting(false);

      handleClose();
    }
    catch (error) {
      setStatus(
        error.response
          ? error.response.data.message
          : 'Ha ocurrido un error, inténtalo de nuevo.'
      );
    }
  };

  if (isLoading) {
    return (
      <Backdrop open={isLoading} className={classes.backdrop}>
        <ScaleLoader loading={isLoading} size={80} color={'#ffffff'} />
      </Backdrop>
    );
  }

  if (isError) {
    return (
      <Backdrop open={isError} className={classes.backdrop}>
        <Status status='error' color='#ffffff' />
      </Backdrop>
    );
  }

  return (
    <BaseDialog
      isOpen={true}
      handleClose={handleClose}
      handleSubmit={handleSubmit}
      initialValues={{
        title: card.title || '',
        content: card.content || '',
        duedate: card.due_date || null,
      }}
      customStyles={classes.dialog}
      reinitialize={true}
    >
      <CardTitle
        title={card.title}
        createdAt={card.createdAt}
        list={card.list}
        isEditing={isEditing['title']}
        setIsEditing={setIsEditing}
        classes={{
          alignIcon: classes.alignIcon,
          editIcon: classes.editIcon,
        }}
      />
      <CardDuedate
        duedate={card.due_date}
        isEditing={isEditing['duedate']}
        setIsEditing={setIsEditing}
        classes={{
          alignIcon: classes.alignIcon,
          editIcon: classes.editIcon,
        }}
      />
      <CardDescription
        content={card.content}
        isEditing={isEditing['content']}
        setIsEditing={setIsEditing}
        classes={{
          alignIcon: classes.alignIcon,
          editIcon: classes.editIcon,
          content: classes.content,
        }}
      />
    </BaseDialog>
  );
};

const CardTitle = ({ 
  title, 
  createdAt, 
  list, 
  classes, 
  isEditing, 
  setIsEditing 
}) => {
  return (
    <div>
      <Typography variant='subtitle1'>
        <LibraryBooksIcon className={classes.alignIcon} />
        {isEditing ? (
          <CustomField type='text' name='title' color='secondary' />
        ) : (
          <strong>{title}</strong>
        )}
        <IconButton
          className={classes.editIcon}
          onClick={() =>
            setIsEditing((editing) => ({ 
              ...editing, 
              title: !isEditing
            }))
          }
        >
          {isEditing ? (
            <CloseIcon fontSize='small' />
          ) : (
            <CreateIcon fontSize='small' />
          )}
        </IconButton>
      </Typography>
      <Typography variant='caption' display='block'>
        En la lista <Highlight>{list}</Highlight>.
      </Typography>
      <Typography variant='caption' display='block'>
        Creada <Highlight>{dayjs(createdAt).fromNow()}</Highlight>.
      </Typography>
    </div>
  );
};

const CardDuedate = ({ duedate, classes, isEditing, setIsEditing }) => {
  return (
    <Field>
      <Typography variant='subtitle1'>
        <EventNoteIcon className={classes.alignIcon} />
        <strong>Fecha Límite</strong>
        <IconButton
          className={classes.editIcon}
          onClick={() =>
            setIsEditing((editing) => ({ 
              ...editing, 
              duedate: !isEditing
            }))
          }
        >
          {isEditing ? (
            <CloseIcon fontSize='small' />
          ) : (
            <CreateIcon fontSize='small' />
          )}
        </IconButton>
      </Typography>
      {isEditing ? (
        <CustomField type='date' name='duedate' color='secondary' />
      ) : duedate ? (
        <>
          <Typography display='block' gutterBottom>
            Esta carta vence el <Highlight> {dayjs(duedate).format('DD/MM/YYYY')}</Highlight>
          </Typography>
          <Typography variant='caption'>
            En apróximadamente <Highlight>{dayjs(new Date()).to(duedate, true)}</Highlight>.
          </Typography>
        </>
      ) : (
        <Typography variant='caption'>
          Esta carta <Highlight>no tiene</Highlight> fecha límite.
        </Typography>
      )}
    </Field>
  );
};

const CardDescription = ({ content, classes, isEditing, setIsEditing }) => {
  return (
    <Field>
      <Typography variant='subtitle1'>
        <DehazeIcon className={classes.alignIcon} />
        <strong>Descripción</strong>
        <IconButton
          className={classes.editIcon}
          onClick={() =>
            setIsEditing((editing) => ({ 
              ...editing, 
              content: !isEditing
            }))
          }
        >
          {isEditing ? (
            <CloseIcon fontSize='small' />
          ) : (
            <CreateIcon fontSize='small' />
          )}
        </IconButton>
      </Typography>
      {isEditing ? (
        <div style={{ textAlign: 'center' }}>
          <CustomField
            type='text'
            name='content'
            color='secondary'
            className={classes.content}
            InputProps={{ disableUnderline: true }}
            multiline
            fullWidth
            rows={8}
            rowsMax={10}
          />
          <Typography variant='caption' display='block'>
            Puedes usar <Highlight>Markdown</Highlight>.
          </Typography>
        </div>
      ) : content ? (
        <ReactMarkdown source={content} />
      ) : (
        <NoDescription>
          <img src={team} alt='Team' />
          <p>
            No hay una descripción, agrega una para que sea más fácil{' '}
            <Highlight>manejar esta carta</Highlight>.
          </p>
        </NoDescription>
      )}
    </Field>
  );
};
