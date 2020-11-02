import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import Layout from '../../components/layout';
import Container from '../../../container/container';
import LANGS from '../../../../constants/langs';
import Input from '../../../input/input';
import Header from '../components/header';
import SubHeader from '../components/subheader';
import GalleryIcon from '../../../../assets/icons/gallery.inline.svg';
import CloseIcon from '../../../../assets/icons/close.inline.svg';
import Carousel from '../components/carousel';
import BlocksWrapper from '../components/blocksWrapper';

const CatalogForm = ({
  initial = {},
  buttons,
  formProps,
  disabled,
  title
}) => {
  const fileInputRef = React.createRef();
  const [ image, setImage ] = useState(
    Array.isArray(initial.images)
    ? initial.images[0]
    : undefined
  );
  const [ gallery, setGallery ] = useState(
    Array.isArray(initial.images)
    ? initial.images.slice(1)
    : []
  );
  const [ lang, setLang ] = useState(LANGS.RU)
  const { register, handleSubmit, formState } = useForm();

  useEffect(() => {
    if (Array.isArray(initial.images)) {
      setImage(initial.images[0]);
    }
  }, [ initial.images ])

  const { onSubmit, ...restFormProps } = formProps;
  const date = initial.date || new Date();

  const galleryBtnClickHandler = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  const removeImage = () => setImage(null);

  const fileChangeHandler = ({ target: { files }}) => {
    if (files.length) {
      setImage(URL.createObjectURL(files[0]));
    }
  }

  const submitCallback = data => onSubmit({ ...data, image });

  return (
    <Layout>
      <Header>{title}</Header>
      <SubHeader
        date={date}
        setLang={setLang}
        activeLang={lang}
      />
      <Form onSubmit={handleSubmit(submitCallback)} {...restFormProps}>
        <StyledContainer alignItems='stretch' fullWidth>
          <ImagesBlock direction='column' fullWidth>
            <ImageWrapper $image={image} justifyContent='center' alignItems='center'>
              <IconButton onClick={galleryBtnClickHandler}>
                <GalleryIcon css={{ width: '40px' }} />
              </IconButton>
              {
                image &&
                <IconButton onClick={removeImage} $closeBtn>
                  <CloseIcon css={{ stroke: 'black' }} />
                </IconButton>
              }
              <FileInput
                ref={fileInputRef}
                type='file'
                accept="image/*"
                onChange={fileChangeHandler} />
            </ImageWrapper>
            <Carousel gallery={gallery} setGallery={setGallery} />
          </ImagesBlock>
          <Container direction='column' fullWidth>
            <Input
              name='name'
              label='title'
              disabled={disabled}
              placeholder='Enter item title'
              inputRef={register({ required: true })}
              defaultValue={initial.name}
            />
            <Input
              name='brief'
              label='Short Description'
              disabled={disabled}
              placeholder='Enter item short description'
              inputRef={register({ required: true })}
              defaultValue={initial.brief}
              multiline 
            />
            <PriceWrapper alignItems='center' fullWidth>
              <PriceInput
                name='firstPrice'
                type='number'
                label='price'
              />
              <span>/</span>
              <PriceInput
                name='secondPrice'
                type='number'
              />
            </PriceWrapper>
          </Container>
        </StyledContainer>
        <BlocksWrapper
          
        />
        <Buttons justifyContent='center' fullWidth>
          { buttons(formState) }
        </Buttons>
      </Form>
    </Layout>
  );
}

// const Label = styled.

const PriceInput = styled(Input)`
  :not(:last-of-type) {
    margin-bottom: 0;
  }
  :first-of-type {
    margin-right: 10px
  }
  :last-of-type {
    margin-left: 10px;
    margin-top: auto;
  }
  > input {
    background: white;
    border: 1px solid black;
    border-radius: 4px;
    padding: 10px;
  }
  label {
    margin-bottom: 10px;
  }
`;

const PriceWrapper = styled(Container)`
  margin-top: auto;
  margin-bottom: 70px;
  max-width: 400px;
  min-width: 300px;
  span {
    margin-top: 24px;
  }
`;

const StyledContainer = styled(Container)`
  margin-bottom: 40px;
`;

const FileInput = styled.input`
  display: none;
`;

const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  border: none;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #aaa;
  padding: 12px;
  cursor: pointer;
  transition: 0.3s;
  :hover {
    background-color: #aaa9;
  }
  ${
    ({ $closeBtn }) => $closeBtn && `
      position: absolute;
      position: absolute;
      top: 10px;
      right: 10px;
    `
  }
`;

const Buttons = styled(Container)`
  button:not(:last-of-type) {
    margin-right: 20px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  > div:first-of-type {
    margin-top: 40px;
  }
`;

const ImageWrapper = styled(Container)`
  position: relative;
  max-width: 300px;
  width: 100%;
  height: 400px;
  background: ${({ $image, theme }) => (
    $image
    ? `url(${$image}) center/cover`
    : theme.color.darkBeige
  )};
`;

const ImagesBlock = styled(Container)`
  max-width: 300px;
  margin-right: 20px;
`;

export default CatalogForm;
