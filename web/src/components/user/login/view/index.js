import React from 'react';

export const LoginView = function (context) {
    return (
        < div className="login">
            <div className="row">
                <div className="col">
                    <form className="form-block justify-content-center">
                        <div className="form-group mx-sm-3 mb-2">
                            <input type="text" className="input" onChange={context.onFirstName} placeholder="First Name" />
                        </div>
                        <div className="form-group mx-sm-3 mb-2">
                            <input type="text" className="input" onChange={context.onLastName} placeholder="Last Name" />
                        </div>
                        <div className="form-group mx-sm-3 mb-2">
                            <input type="password" className="input" onChange={context.onPassword} placeholder="Password" />
                        </div>

                        <button type="button" className="submit" onClick={context.process}>Sign in</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
