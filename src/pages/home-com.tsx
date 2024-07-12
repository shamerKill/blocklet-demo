import { Col, Divider, Input, Row } from 'antd';
import { Title } from '../components/layout/main';

function ComHomeItem({
  title,
  value,
  divider,
  disabled,
  onChange,
}: {
  title: string;
  value: string;
  divider?: boolean;
  disabled?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <div
      style={{
        overflow: 'hidden',
        height: disabled && !value ? '0px' : '90px',
        transition: 'height 0.3s',
      }}>
      <Divider dashed style={{ borderColor: divider ? '#ccc' : 'transparent', margin: '0.8em' }} />
      <Row>
        <Col span={24}>
          <Row justify="center" align="middle">
            <Col span={24} md={4}>
              <Title
                level={4}
                style={{
                  margin: '0em',
                  color: '#999',
                }}>
                {title}
              </Title>
            </Col>
            <Col span={24} md={{ span: 16, offset: 0 }}>
              <Input
                style={{
                  minWidth: '200px',
                  backgroundColor: 'transparent',
                  color: '#000',
                  borderColor: disabled ? 'transparent' : '#d9d9d9',
                  textAlign: 'center',
                  fontSize: '14px',
                  transition: 'border-color 0.3s',
                  cursor: 'text',
                }}
                value={value}
                onChange={onChange}
                disabled={disabled}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

ComHomeItem.defaultProps = {
  divider: false,
  disabled: false,
  onChange: () => {},
};

export default ComHomeItem;
