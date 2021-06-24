import { CallState, EntityStatus } from '@tomtomb/ngrx-toolkit';
import { entitySelectors } from './auth.selectors';

describe('AuthSelectors', () => {
  const entityInit: EntityStatus = {
    action: {
      type: 'test',
    },
    callState: CallState.INIT,
    timestamp: 1241412412,
  };

  const entityCall: EntityStatus = {
    action: {
      type: 'test',
      args: {
        someArg: 'yes',
      },
    },
    callState: CallState.LOADING,
    timestamp: 1241412412,
  };

  const entitySuccess: EntityStatus = {
    action: {
      type: 'test',
      args: {
        someArg: 'yes',
      },
      response: {
        test: 'yes',
      },
    },
    callState: CallState.SUCCESS,
    timestamp: 1241412412,
  };

  const entityFailure: EntityStatus = {
    action: {
      type: 'test',
      args: {
        someArg: 'yes',
      },
      error: {
        data: 'test',
        message: 'error message',
        status: 'error',
      },
    },
    callState: CallState.ERROR,
    timestamp: 1241412412,
  };

  it('should have working entity getArgs() selector', () => {
    const result = entitySelectors.getArgs('foo', 123).projector(entityCall);

    expect(result).toEqual({
      someArg: 'yes',
    });
  });

  it('should have working entity getCallState() selector', () => {
    const result = entitySelectors
      .getCallState('foo', 123)
      .projector(entityCall);

    expect(result).toEqual(CallState.LOADING);
  });

  it('should have working entity getEntityId() selector', () => {
    const result = entitySelectors
      .getEntityId('foo', 123)
      .projector(entityCall);

    expect(result).toEqual(123);
  });

  it('should have working entity getError() selector', () => {
    const result = entitySelectors
      .getError('foo', 123)
      .projector(entityFailure);

    expect(result).toEqual({
      data: 'test',
      message: 'error message',
      status: 'error',
    });
  });

  it('should have working entity getIsError() selector', () => {
    const result = entitySelectors
      .getIsError('foo', 123)
      .projector(entityFailure);

    expect(result).toEqual(true);
  });

  it('should have working entity getIsInit() selector', () => {
    const result = entitySelectors.getIsInit('foo', 123).projector(entityInit);

    expect(result).toEqual(true);
  });

  it('should have working entity getIsLoading() selector', () => {
    const result = entitySelectors
      .getIsLoading('foo', 123)
      .projector(entityCall);

    expect(result).toEqual(true);
  });

  it('should have working entity getIsSuccess() selector', () => {
    const result = entitySelectors
      .getIsSuccess('foo', 123)
      .projector(entitySuccess);

    expect(result).toEqual(true);
  });

  it('should have working entity getResponse() selector', () => {
    const result = entitySelectors
      .getResponse('foo', 123)
      .projector(entitySuccess);

    expect(result).toEqual({
      test: 'yes',
    });
  });

  it('should have working entity getTimestamp() selector', () => {
    const result = entitySelectors
      .getTimestamp('foo', 123)
      .projector(entityCall);

    expect(result).toEqual(1241412412);
  });

  it('should have working entity getType() selector', () => {
    const result = entitySelectors.getType('foo', 123).projector(entityCall);

    expect(result).toEqual('test');
  });
});
