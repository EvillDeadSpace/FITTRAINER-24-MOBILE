import React from 'react';
import SkeletonContent from 'react-native-skeleton-content';

const Loader = () => {
    return (
        <SkeletonContent
            containerStyle={{flex: 1, width: '100%'}}
            isLoading={true}
            layout={[
                { key: 'someId', width: '100%', height: 50, marginBottom: 10 },
                { key: 'someOtherId', width: '100%', height: 50, marginBottom: 10 }
            ]}
        />
    );
};

export default Loader;
