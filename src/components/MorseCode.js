import React from "react";
import { translateToMorseCode, sleep, playSound } from "../core"

export default class MorseCode extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            input: "",
            output: "",
            loading: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.display = this.display.bind(this);
    }

    handleChange(event) {
        this.setState({ input: event.target.value });
    }

    createMarkup(input) {
        return { __html: input };
    }

    async display() {
        this.setState({ loading: true });
        this.setState({ output: "" });
        for (let i of [...translateToMorseCode(this.state.input)]) {
            await sleep(200);
            if (i === "•") {
                playSound();
            }
            else if (i === "−") {
                playSound();
                playSound();
            }
            this.setState({ output: this.state.output + "" + i });
        }
        this.setState({ loading: false });
    }


    render() {
        return (
            <div className="col-6">
                <div className="form-group">
                    <label for="exampleFormControlInput1">Message</label>
                    <input type="email" className="form-control" value={this.state.input} onChange={this.handleChange} />
                </div>

                <div className="form-group">
                    <button disabled={this.state.loading} onClick={this.display} className="btn btn-success">Show me with effect</button>
                </div>

                <div className="card text-white bg-info mb-3">
                    <div className="card-header">Output</div>
                    <div className="card-body">
                        <h5 className="card-title"></h5>
                        <p className="card-text">{translateToMorseCode(this.state.input)}</p>
                        <span style={{ color: "yellow" }}>{this.state.output}</span>
                    </div>
                </div>

            </div >
        )
    }
}