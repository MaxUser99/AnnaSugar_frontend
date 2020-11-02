import React from 'react';
import Preview from '../../preview/preview';

const List = ({
  data,
  imageField,
  nameField,
  descriptionField,
  dateField,
  itemClickHandler
}) => (
  <>
    {
      data.map(item => (
        <Preview
          key={item.id}
          image={item[imageField]}
          name={item[nameField]}
          description={item[descriptionField]}
          date={item[dateField]}
          linkProps={{
            show: true,
            text: 'Edit \u003E',
            to: '' + item.id,
            onClick: itemClickHandler
              ? () => itemClickHandler(item)
              : null
          }}
        />
      ))
    }
  </>
);

export default List;
