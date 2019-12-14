import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Home from 'src/components/pages/Home';
import * as actions from 'src/modules/user/actions';
import * as selectors from 'src/modules/user/selectors';

const mapStateToProps = (state: App.State) => ({
  user: selectors.selectUser(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  login: (username: string, password: string) =>
    dispatch(
      actions.login.request({
        username,
        password,
      })
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
