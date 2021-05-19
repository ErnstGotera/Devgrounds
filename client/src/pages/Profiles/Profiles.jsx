import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../../components/layout/Spinner';
import ProfileItem from './ProfileItem';
import './Profiles.scss';
import { getProfiles } from '../../redux/actions/profile';

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  const [search, setSearch] = useState('');
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  const filteredProfiles = profiles.filter(profile =>
    profile.user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary">Developers</h1>
          <p className="lead">
            <i className="fab fa-connectdevelop" /> Browse and connect with
            developers
          </p>

          <input
            onChange={e => setSearch(e.target.value)}
            type="search"
            placeholder="Search developers"
            className="search-bar"
          />
          <div className="profiles">
            {filteredProfiles.length > 0 ? (
              filteredProfiles.map(profile => (
                <ProfileItem key={profile._id} profile={profile} />
              ))
            ) : (
              <h4>No profiles found...</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
