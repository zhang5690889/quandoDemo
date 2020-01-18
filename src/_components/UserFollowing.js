import React from "react";
import {userService} from '../_services/user.service'
import {Link} from "react-router-dom";
import photo from "../resources/user_dark.png"

export default class UserFollowing extends React.Component {

    constructor(props) {
        super(props);
        this.userService = userService;
        this.state = {
            username: this.props.username,
            unfollowedTraders: [],
            followedTraders: [],
            followers: []
        }
    }

    refreshUnfollowedUser() {
        this.userService.findUnfollowedUser(this.state.username).then(users => {
            this.setState({
                unfollowedTraders: users.filter(u => u.username !== this.state.username)
            })
        })
    }

    refreshFollowedUsers() {
        this.userService.findfollowedUser(this.state.username).then(users => {
            this.setState({
                followedTraders: users
            })
        })
    }

    getAllFollowers = () =>
        this.userService.getAllFollowersForUser(this.state.username)
            .then(followers => {
                this.setState({
                    followers: followers
                })
            });


    componentDidMount() {
        this.refreshUnfollowedUser();
        this.refreshFollowedUsers();
        this.getAllFollowers();
    }

    follow(followedUsername) {
        this.userService.followUser(followedUsername, this.state.username).then(x => {
                this.refreshUnfollowedUser();
                this.refreshFollowedUsers();
            }
        )
    }

    unfollow = hisUsername => {
        this.userService.unfollowUser(hisUsername, this.state.username)
            .then(response => {
                this.refreshUnfollowedUser();
                this.refreshFollowedUsers();
            })
    };


    render() {
        return (
            <div>
                <div
                    className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
                    <h1 className="h2">Following</h1>
                </div>
                <div className={"card"}>
                    <div className={"card-header"}>
                        Your Followers
                    </div>
                    <div className={"card-body"}>
                        {
                            this.state.followers.length === 0 &&
                                <p className={"lead"}>You haven't been followed by any trader.</p>
                        }
                        {
                            this.state.followers.map((user, key) => {
                                    return (
                                        <div className="media text-muted pt-3" key={key}>
                                            <img src={photo} alt="" width="32" height="32"
                                                 className="bd-placeholder-img mr-2 rounded"/>

                                            <div
                                                className="media-body pb-3 mb-0 small lh-125 border-gray border-bottom">
                                                <div
                                                    className="d-flex justify-content-between align-items-center w-100">
                                                    <Link to={"/profile/" + user.username}><strong
                                                        className="text-gray-dark">{user.username}</strong></Link>
                                                </div>
                                                <span className="d-block">{user.firstName} {user.lastName} </span>
                                            </div>
                                        </div>
                                    )
                                }
                            )
                        }
                    </div>
                </div>
                <div className={"card mt-3"}>
                    <div className={"card-header"}>
                        Following
                    </div>
                    <div className={"card-body"}>
                        {
                            this.state.followedTraders.length === 0 &&
                                <p className={"lead"}>You haven't followed any traders.</p>
                        }
                        {
                            this.state.followedTraders.map((user, key) => {
                                    return (
                                        <div className="media text-muted pt-3" key={key}>
                                            <img src={photo} alt="" width="32" height="32"
                                                 className="bd-placeholder-img mr-2 rounded"/>
                                            <div
                                                className="media-body pb-3 mb-0 small lh-125 border-gray border-bottom">
                                                <div
                                                    className="d-flex justify-content-between align-items-center w-100">
                                                    <Link to={"/profile/" + user.username}><strong
                                                        className="text-gray-dark">{user.username}</strong></Link>
                                                    <a className={"ml-auto"} href={"#"}
                                                       onClick={() => this.unfollow(user.username)}>Unfollow
                                                    </a>
                                                </div>
                                                <span className="d-block">{user.firstName} {user.lastName} </span>
                                            </div>
                                        </div>
                                    )
                                }
                            )
                        }
                    </div>
                </div>

                <div className={"card mt-3"}>
                    <div className={"card-header"}>
                        Unfollowed Users
                    </div>
                    <div className={"card-body"}>
                        {
                            this.state.unfollowedTraders.length === 0 &&
                            <p className={"lead"}>There are no traders you can follow.</p>
                        }
                        {
                            this.state.unfollowedTraders.map((user, key) => {
                                    return (
                                        <div className="media text-muted pt-3" key={key}>
                                            <img src={photo} alt="" width="32" height="32"
                                                 className="bd-placeholder-img mr-2 rounded"/>
                                            <div
                                                className="media-body pb-3 mb-0 small lh-125 border-gray border-bottom">
                                                <div
                                                    className="d-flex justify-content-between align-items-center w-100">
                                                    <Link to={"/profile/" + user.username}><strong
                                                        className="text-gray-dark">{user.username}</strong></Link>

                                                    <a className={"ml-auto"} href={"#"}
                                                       onClick={() => this.follow(user.username)}>Follow
                                                    </a>
                                                </div>
                                                <span className="d-block">{user.firstName} {user.lastName} </span>
                                            </div>
                                        </div>

                                    )
                                }
                            )
                        }
                    </div>
                </div>
            </div>
        )
    }
}
