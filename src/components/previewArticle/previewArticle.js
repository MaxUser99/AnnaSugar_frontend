// import React from 'react';
// import styled from 'styled-components';
// import PropTypes from 'prop-types';
// import { Link as BrowserLink } from 'gatsby';
// import { connect } from 'react-redux';
// import { setReviewArticle } from '../../store/content/articleActions';
// import Container from '../container/container';

// const Article = ({ article, setReviewArticle }) => {
//   const linkClickHandler = () => setReviewArticle(article);

//   const { id, date, title, text, image } = article;
//   const month = date.toLocaleDateString('EN-US', { month: 'long' });
//   const year = date.getFullYear();
//   const dayOfMonth = date.getDate();

//   let day;
//   switch (dayOfMonth) {
//     case 1:
//       day = '1st';
//       break;
//     case 2:
//       day = '2nd';
//       break;
//     case 3:
//       day = '3rd';
//       break;
//     default:
//       day = `${dayOfMonth}th`;
//       break;
//   }

//   const dateString = `${month}, ${day} ${year}`;

//   return (
//     <StyledContainer direction='column' fullWidth>
//       <Date>{dateString}</Date>
//       <Container alignItems='stretch'>
//         <ImageWrapper>
//           <Image src={image} />
//         </ImageWrapper>
//         <TextContainer direction='column' fullWidth>
//           <Title>{title}</Title>
//           <Text>{text}</Text>
//           <Link onClick={linkClickHandler} to={`/blog/${id}`}>Read &gt;</Link>
//         </TextContainer>
//       </Container>
//     </StyledContainer>
//   );
// }

// const StyledContainer = styled(Container)`
//   &:not(:last-of-type) {
//     margin-bottom: 32px;
//   }
// `;

// const Date = styled.h3`
//   width: 100%;
//   border-bottom: 1px solid #171A1E33;
//   border-radius: 1px;
//   font-size: 14px;
//   line-height: 28px;
//   color: ${({ theme }) => theme.text.default};
//   margin: 0 0 31px;
//   padding-bottom: 3px;
// `;

// const TextContainer = styled(Container)`
//   max-width: 464px;
//   margin-left: 70px;
// `;

// const ImageWrapper = styled(Container)`
//   width: 342px;
//   height: 270px;
// `;

// const Image = styled.img`
//   max-width: 100%;
//   max-height: 100%;
// `;

// const Title = styled.h4`
//   margin: 0 0 10px;
//   font-weight: bold;
//   font-size: 32px;
//   line-height: 32px;
//   color: ${({ theme }) => theme.text.header};
//   font-family: "Cormorant Infant";
// `;

// const Text = styled.p`
//   margin: 0;
//   font-size: 14px;
//   line-height: 28px;
// `;

// const Link = styled(BrowserLink)`
//   padding-top: 32px;
//   margin-top: auto;
//   text-decoration: none;
//   font-size: 14px;
//   color: ${({ theme }) => theme.text.default};
// `;

// Article.propTypes = {
//   clickHandler: PropTypes.func,
//   article: PropTypes.shape({
//     data: PropTypes.object,
//     title: PropTypes.string,
//     text: PropTypes.string,
//     image: PropTypes.string
//   })
// };

// export default connect(
//   null,
//   dispatch => ({
//     setReviewArticle: article => dispatch(setReviewArticle(article)),
//   })
// )(Article);
