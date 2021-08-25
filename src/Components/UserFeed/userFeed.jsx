import React from 'react';


const UserFeed = (props) => {
  const {currentUser, currentToken, usersFeed} = props
  
  
  return ( 
    <div className="container-fluid main h-100">
      <div className="row mainRow h-100">
        <div className="col"></div>
        <div className="col">
          <row>
          {currentUser.user.username}'s Feed
          </row>
          <row>
            {usersFeed.map((post) => {
              console.log(post);
              return (
                
                <div className="card gedf-card">
                    <div className="card-header">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="mr-2">
                                    <img className="rounded-circle" width="45" src="https://picsum.photos/50/50" alt="" />
                                </div>
                                <div className="ml-2">
                                    <div className="h5 m-0">{post.user.userName}</div>
                                    <div className="h7 text-muted">{post.taco.shop.name}</div>
                                </div>
                            </div>
                            
                        </div>

                    </div>
                    <div className="card-body">
                        <div className="text-muted h7 mb-2"> <i className="fa fa-clock-o"></i>10 min ago</div>
                        <a className="card-link" href="#">
                            <h5 className="card-title">{post.user.userName} checked in the {post.taco.name}!</h5>
                        </a>

                        <p className="card-text">
                            {post.description}
                        </p>
                    </div>
                    <div className="card-footer">
                        <a href="#" className="card-link"><i className="fa fa-gittip"></i> Like</a>
                        <a href="#" className="card-link"><i className="fa fa-comment"></i> Comment</a>
                        <a href="#" className="card-link"><i className="fa fa-mail-forward"></i> Share</a>
                    </div>
                </div>
              )
            })}
            {/* CREATE POST */}
            <div className="card gedf-card">
                    <div className="card-header">
                        <ul className="nav nav-tabs card-header-tabs" id="myTab" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link active" id="posts-tab" data-toggle="tab" href="#posts" role="tab" aria-controls="posts" aria-selected="true">Make
                                    a publication</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" id="images-tab" data-toggle="tab" role="tab" aria-controls="images" aria-selected="false" href="#images">Images</a>
                            </li>
                        </ul>
                    </div>
                    <div className="card-body">
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade show active" id="posts" role="tabpanel" aria-labelledby="posts-tab">
                                <div className="form-group">
                                    <label className="sr-only" for="message">post</label>
                                    <textarea className="form-control" id="message" rows="3" placeholder="What are you thinking?"></textarea>
                                </div>

                            </div>
                            <div className="tab-pane fade" id="images" role="tabpanel" aria-labelledby="images-tab">
                                <div className="form-group">
                                    <div className="custom-file">
                                        <input type="file" className="custom-file-input" id="customFile"/>
                                        <label className="custom-file-label" for="customFile">Upload image</label>
                                    </div>
                                </div>
                                <div className="py-4"></div>
                            </div>
                        </div>
                        <div className="btn-toolbar justify-content-between">
                            <div className="btn-group">
                                <button type="submit" className="btn btn-primary">share</button>
                            </div>
                            <div className="btn-group">
                                <button id="btnGroupDrop1" type="button" className="btn btn-link dropdown-toggle" data-toggle="dropdown" aria-haspopup="true"
                                    aria-expanded="false">
                                    <i className="fa fa-globe"></i>
                                </button>
                                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="btnGroupDrop1">
                                    <a className="dropdown-item" href="#"><i className="fa fa-globe"></i> Public</a>
                                    <a className="dropdown-item" href="#"><i className="fa fa-users"></i> Friends</a>
                                    <a className="dropdown-item" href="#"><i className="fa fa-user"></i> Just me</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* CREATE POST */}

                
          </row>
        </div> 
        <div className="col"></div>
      </div>
    </div>
   );
}
 
export default UserFeed;