import React, { useState } from 'react';
import { Select, Modal, Input, notification } from 'antd';
import VBPO from '../assets/VBPO.png';
import { Transition } from 'react-transition-group';
import Round from './Round';
import Axios from 'axios';
import { useWindowSize } from '@react-hook/window-size';
import Confetti from 'react-confetti';
import Gold from '../assets/gold.png';
import Background from '../assets/background.png';
import ManyDollar from '../assets/nanyDollar.png';
import Dollar from '../assets/dollar.png';
import LittleDollar from '../assets/littleDollar.png';
import Rose from '../assets/rose.png';

const { Option } = Select;

const key = 'Vbpo@12345';

function RandomPage(props) {
  const [width, height] = useWindowSize();
  const [visible, setVisible] = useState(true);
  const [auth, setAuth] = useState('');
  const [select, setSelect] = useState('');
  const [winner, setWinner] = useState({ FullName: '', MSNV: '' });
  const [listReward, setListReward] = useState([]);
  const [effect, setEffect] = useState(false);
  const [effect2, setEffect2] = useState(false);
  const [congrats, setCongrats] = useState(false);
  const [stop, setStop] = useState(false);
  const [showOk, setShowOk] = useState(false);
  const [done, setDone] = useState(null);
  const [round1, setRound1] = useState('0');
  const [round2, setRound2] = useState('0');
  const [round3, setRound3] = useState('0');
  const [round4, setRound4] = useState('0');
  const [round5, setRound5] = useState('0');
  const [round6, setRound6] = useState('0');
  const [number1, setNumber1] = useState(null);
  const [number2, setNumber2] = useState(null);
  const [number3, setNumber3] = useState(null);
  const [number4, setNumber4] = useState(null);
  const [number5, setNumber5] = useState(null);
  const [number6, setNumber6] = useState(null);
  const duration = 200;

  const fastAnimation = {
    animationIterationCount: 1,
    animationDuration: `5s`,
    animationTimingFunction: `ease-in-out`,
    animationFillMode: `forwards`,
    animationName: `slidedown`,
  };

  const onRound = async () => {
    const url = '/random_user';
    const response = await Axios.post(url, { reward_type: select });

    if (response.data) {
      const user = response.data.list_user[0];
      setWinner(user);
      setStop(true);
      setDone(true);
      let length = 0;
      // round 1 -----------------------
      if (user.MSNV.length === 5) {
        setTimeout(() => {
          setRound1('1');
          setNumber1(0);
          length = 1;
        }, 0);
      } else {
        setTimeout(() => {
          length = 0;
          setRound1('1');
          setNumber1(user.MSNV[0]);
        }, 0);
      }

      setTimeout(() => {
        setRound1('0');
      }, 5000);
      // round 2 -----------------------
      setTimeout(() => {
        setNumber2(user.MSNV[1 - length]);
        setRound2('1');
      }, 5000);

      setTimeout(() => {
        setRound2('0');
      }, 10000);
      // round 3-----------------------
      setTimeout(() => {
        setNumber3(user.MSNV[2 - length]);
        setRound3('1');
      }, 10000);

      setTimeout(() => {
        setRound3('0');
      }, 15000);
      // round 4 -----------------------
      setTimeout(() => {
        setNumber4(user.MSNV[3 - length]);
        setRound4('1');
      }, 15000);

      setTimeout(() => {
        setRound4('0');
      }, 20000);
      // round 5 -----------------------
      setTimeout(() => {
        setNumber5(user.MSNV[4 - length]);
        setRound5('1');
      }, 20000);

      setTimeout(() => {
        setRound5('0');
      }, 25000);
      // round 6 -----------------------
      setTimeout(() => {
        setNumber6(user.MSNV[5 - length]);
        setRound6('1');
      }, 25000);

      setTimeout(() => {
        setRound6('0');
        setCongrats(true);
        setEffect2(true);
        setDone(null);
        setTimeout(() => {
          setStop(false);
        }, 3000);
      }, 30000);
    }
  };

  const onSubmitEnter = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (e.target.value === key) {
        setVisible(false);
      } else {
        notification.error({ description: 'Mã xác thực không chính xác!' });
      }
    }
  };

  const defaultStyle = {
    transition: `all ${duration}ms ease-in-out`,
    transform: `scale(1)`,
  };

  const transitionStyles = {
    entering: { transform: 'scale(1.3)', boxShadow: '0px 0px 40px #1890ff', border: '3px solid #1890ff' },
    entered: { transform: 'scale(1)' },
    exiting: { transform: 'scale(1)' },
    exited: { transform: 'scale(0)' },
  };

  const defaultStyle2 = {
    transition: `all 1s ease-in-out`,
    transform: `scale(0)`,
  };

  const transitionStyles2 = {
    entering: { transform: 'scale(0)' },
    entered: { transform: 'scale(1)' },
    exiting: { transform: 'scale(1)' },
    exited: { transform: 'scale(0)' },
  };

  const disableRound = {
    pointerEvents: 'none',
    background: '#666',
  };

  const onClear = async () => {
    const url = '/clear_all';
    const response = await Axios.post(url);
    if (response.data) {
      clear();
    }
  };

  const clear = (value) => {
    setNumber1(0);
    setNumber2(0);
    setNumber3(0);
    setNumber4(0);
    setNumber5(0);
    setNumber6(0);
    setDone(null);
    setCongrats(false);
    setEffect2(false);
    setShowOk(false);
    (async () => {
      const url = '/return_list_reward';
      const response = await Axios.post(url, { reward_type: value !== undefined ? value : select });
      if (response.data) {
        setListReward(response.data.list_user);
      }
    })();
  };

  const onSelectChange = (value) => {
    setSelect(value);
    clear(value);
    setEffect(false);
    setTimeout(() => {
      setEffect(true);
    }, 400);
  };

  //   const onCheckLimit = (value, listReward) => {
  //     if (value === 'giải đặc biệt' && listReward.length >= 1 && listReward[0].FullName !== undefined) {
  //       notification.error({ description: 'Số lần quay đã hết' });
  //       return false;
  //     } else if (value === 'giải nhất' && listReward.length >= 2) {
  //       notification.error({ description: 'Số lần quay đã hết' });
  //       return false;
  //     } else if (value === 'giải nhì' && listReward.length >= 2) {
  //       notification.error({ description: 'Số lần quay đã hết' });
  //       return false;
  //     } else if (value === 'giải ba' && listReward.length >= 3) {
  //       notification.error({ description: 'Số lần quay đã hết' });
  //       return false;
  //     } else if (value === 'giải may mắn' && listReward.length >= 10) {
  //       notification.error({ description: 'Số lần quay đã hết' });
  //       return false;
  //     }
  //     return true;
  //   };

  const onReward = () => {
    switch (select) {
      case 'giải đặc biệt':
        return Gold;
      case 'giải nhất':
        return ManyDollar;
      case 'giải nhì':
        return Dollar;
      case 'giải ba':
        return LittleDollar;
      case 'giải may mắn':
        return Rose;
      default:
        return '';
    }
  };
  return (
    <div className="wrap-page container-fluid m-0">
      <img className="full-background" width={width} height={height} src={Background} alt="error" />
      <section className="wrap-content row m-0">
        <section className="left col-9">
          <div className="content">
            <div className="list-box">
              <ul>
                <li className="box">
                  <Round round={round1} fastAnimation={fastAnimation} result={number1}></Round>
                </li>
                <li className="box">
                  <Round round={round2} fastAnimation={fastAnimation} result={number2}></Round>
                </li>
                <li className="box">
                  <Round round={round3} fastAnimation={fastAnimation} result={number3}></Round>
                </li>
                <li className="box">
                  <Round round={round4} fastAnimation={fastAnimation} result={number4}></Round>
                </li>
                <li className="box">
                  <Round round={round5} fastAnimation={fastAnimation} result={number5}></Round>
                </li>
                <li className="box">
                  <Round round={round6} fastAnimation={fastAnimation} result={number6}></Round>
                </li>
              </ul>
              <div className="action">
                <Select
                  onChange={onSelectChange}
                  className="choose-reward"
                  defaultValue="Chọn giải"
                  style={{ width: 120 }}
                >
                  <Option value={'giải đặc biệt'}>Giải đặc biệt</Option>
                  <Option value={'giải nhất'}>Giải nhất</Option>
                  <Option value={'giải nhì'}>Giải nhì</Option>
                  <Option value={'giải ba'}>Giải ba</Option>
                  <Option value={'giải may mắn'}>Giải may mắn</Option>
                </Select>
              </div>
              <div className="round">
                <Transition in={effect} timeout={duration}>
                  {(state) => (
                    <button
                      onClick={onRound}
                      style={
                        (done === null && { ...defaultStyle, ...transitionStyles[state] }) ||
                        (done === true && { ...disableRound })
                      }
                    >
                      Quay
                    </button>
                  )}
                </Transition>
              </div>
              <button className="clear" onClick={onClear}>
                CLEAR
              </button>
              {/* {select !== '' && (
                <div className="reward">
                  <p>{select}</p>
                  <img src={onReward()} alt="error" />
                </div>
              )} */}
            </div>
          </div>
        </section>
        <section className="right col-3">
          <div className="wrap-list-winner">
            <div className="header">
              <p>Danh sách trúng thưởng</p>
            </div>
            <div className="content">
              <ul className="list-item">
                {listReward.map((i, index) => {
                  return (
                    <li key={index} className="item">
                      {i.MSNV && <span>{`${index + 1}. `}</span>}
                      <p>{i.MSNV}</p>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </section>
      </section>
      <div
        className="background"
        style={
          congrats === false
            ? { display: 'none', width: `${width}px`, height: `${height}px` }
            : { display: 'flex', width: `${width}px`, height: `${height}px` }
        }
      >
        <Transition in={effect2}>
          {(state) => (
            <div className="congratulation" style={{ ...defaultStyle2, ...transitionStyles2[state] }}>
              <p>
                Xin Chúc Mừng Bạn &nbsp;<span>{`${winner.FullName}`}</span> <br /> MSNV:&nbsp;
                <span>{`${winner.MSNV}`}</span>&nbsp; Đã Trúng thưởng!!!
              </p>
              <button
                style={
                  showOk === false ? { opacity: 0, pointerEvents: 'none' } : { opacity: 1, pointerEvents: 'visible' }
                }
                onClick={(e) => clear()}
              >
                Ok
              </button>
            </div>
          )}
        </Transition>
      </div>
      <Confetti
        className="confetti"
        run={congrats}
        recycle={stop}
        onConfettiComplete={() => {
          setShowOk(true);
        }}
        numberOfPieces={500}
        width={width}
        height={height}
      />
      <Modal
        title="Nhập mã xác thực"
        visible={visible}
        onCancel={() => {
          notification.warning({ description: 'Chưa nhập mã xác thực !!!' });
        }}
        onOk={() => {
          if (auth === key) {
            setVisible(false);
          } else {
            notification.error({ description: 'Mã xác thực sai !!!' });
          }
        }}
      >
        <Input
          className="text"
          type="password"
          placeholder="Mã"
          onChange={(e) => {
            setAuth(e.target.value);
          }}
          onKeyPress={onSubmitEnter}
        ></Input>
      </Modal>
    </div>
  );
}

export default RandomPage;
