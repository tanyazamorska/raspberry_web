import React from 'react';
import Ticker from './Ticker';
import renderer from 'react-test-renderer';


test('Link changes the class when hovered', () => {

  const instance = new Ticker();

  expect(instance.matrixThis).toBe(null);
  expect(instance.state.speed).toBe(1);

  // const component = renderer.create(
  //   <Ticker/>
  // );
  // let tree = component.toJSON();
  // expect(tree).toMatchSnapshot();

  // // manually trigger the callback
  // tree.props.onMouseEnter();
  // // re-rendering
  // tree = component.toJSON();
  // expect(tree).toMatchSnapshot();
  //
  // // manually trigger the callback
  // tree.props.onMouseLeave();
  // // re-rendering
  // tree = component.toJSON();
  // expect(tree).toMatchSnapshot();
});