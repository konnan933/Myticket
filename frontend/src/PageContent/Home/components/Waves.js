//import waveUpper from '../waves/waves_upper.svg';

function Waves() {
  return (
    <div className=" w-full h-1/10 flex justify-center">
      <div
        style={{
          backgroundImage: 'linear-gradient(to left top ,#FBC95C, transparent)',
          backgroundColor: '#e58e0c',
          transform: 'rotateX(180deg)',
          width: '100%',
          height: '100%',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat'
        }}
        className="my-5"
      />
    </div>
  );
}

export default Waves;
