import React from 'react';
import { CompositeDecorator, EditorState, convertFromRaw } from 'draft-js';

const styles = {
  root: {
    fontFamily: '\'Georgia\', serif'
    , padding: 20
    , width: 600
  },
  buttons: {
    marginBottom: 10
  },
  urlInputContainer: {
    marginBottom: 10
  },
  urlInput: {
    fontFamily: '\'Georgia\', serif'
    , marginRight: 10
    , padding: 3
    , width: '30%'
  },
  editor: {
    border: '1px solid #ccc'
    , cursor: 'text'
    , minHeight: 80
    , padding: 10
  },
  button: {
    marginTop: 10
    , textAlign: 'center'
  },
  link: {
    color: '#3b5998'
    , textDecoration: 'underline'
  },
};

const richContentUtils = {

  editorState(content) {
    // render Draft content
    let rawContent = Object.assign({}, content);
    // console.log(rawContent);
    if(!rawContent.entityMap) {
      rawContent.entityMap = {};
    }
    const Link = (props) => {
      const {url} = props.contentState.getEntity(props.entityKey).getData();
      return (
        <a href={url} style={styles.link}>
          {props.children}
        </a>
      );
    };
    const decorator = new CompositeDecorator([
      {
        strategy: richContentUtils._findLinkEntities
        , component: Link
      }
    ]);
    return EditorState.createWithContent(convertFromRaw(rawContent), decorator);
  }

  , _findLinkEntities(contentBlock, callback, contentState) {
    contentBlock.findEntityRanges(
      (character) => {
        const entityKey = character.getEntity();
        return (
          entityKey !== null &&
          contentState.getEntity(entityKey).getType() === 'LINK'
        );
      },
      callback
    );
  }

}

export default richContentUtils;
