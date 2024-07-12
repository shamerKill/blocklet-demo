import { useCallback, useEffect, useState } from 'react';
import { Avatar, Button, Col, message } from 'antd';
// @ts-ignore
import ConnectButton from '@arcblock/did-connect/lib/Button';
import { useSessionContext } from '../store/session';
// import { useConfig } from '../store/config';
import ComLayoutMain from '../components/layout/main';
import ComHomeItem from './home-com';

import './home.css';

function Home() {
  const { session, api } = useSessionContext();
  // const { setConfig } = useConfig();
  const [did, setDid] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  const [phone, setPhone] = useState('');
  const [fullName, setFullName] = useState('');
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  const getData = useCallback(() => {
    api
      .get('/api/user')
      .then((res: any) => {
        if (res.data?.user) {
          setDid(res.data.user.did);
          setEmail(res.data.user.email);
          setAvatar(res.data.user.avatar);
          setPhone(res.data.user.phone);
          setFullName(res.data.user.fullName);
        }
      })
      .catch(() => {
        // window.location.reload();
      });
    return null;
  }, [api]);

  // 获取用户的账户
  useEffect(() => {
    if (!session.user) return;
    getData();
  }, [session.user, getData]);

  // 按钮
  const onBtnClick = () => {
    if (!edit) {
      return setEdit(true);
    }
    // 检查邮箱
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/.test(email))
      return message.warning('请检查邮箱地址是否正确');
    // 检查姓名
    if (!fullName) return message.warning('请输入您的名字');
    // 检查手机号
    if (phone && !/^1\d{10}$/.test(phone)) return message.warning('请检查手机号是否正确');
    // 上传
    setLoading(true);
    return api
      .post('/api/data', { email, fullName, phone, did })
      .then((res: any) => {
        if (res.data.code === 200) {
          message.success('更新成功');
        } else {
          message.warning('上传更新失败');
        }
        setEdit(false);
      })
      .catch((e: any) => {
        message.warning('上传更新失败', e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (did === '') {
    return (
      <ComLayoutMain>
        <ConnectButton onClick={() => session.login()} />
      </ComLayoutMain>
    );
  }

  return (
    <ComLayoutMain>
      <div className="card">
        <Avatar size={100} src={avatar} />
        <div style={{ padding: '0.5em' }} />
        <ComHomeItem title="DID" value={did} disabled />
        <ComHomeItem title="Email" value={email} divider disabled={!edit} onChange={(e) => setEmail(e.target.value)} />
        <ComHomeItem
          title="FullName"
          value={fullName}
          divider
          disabled={!edit}
          onChange={(e) => setFullName(e.target.value)}
        />
        <ComHomeItem title="Phone" value={phone} divider disabled={!edit} onChange={(e) => setPhone(e.target.value)} />
      </div>
      <div style={{ padding: '1em' }} />
      <Col span={24}>
        <Button type="primary" size="large" loading={loading} onClick={onBtnClick}>
          {edit ? 'Submit' : 'Edit'}
        </Button>
      </Col>
    </ComLayoutMain>
  );
}

export default Home;
